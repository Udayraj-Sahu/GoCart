import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { PaymentMethod } from "@prisma/client";
import Stripe from "stripe";
export async function POST(request) {
	try {
		const { userId, has } = getAuth(request);
		if (!userId) {
			return NextResponse.json(
				{ error: "Not Authorized" },
				{ status: 401 }
			);
		}
		const { addressId, items, couponCode, paymentMethod } =
			await request.json();

		//Check if all fields are present
		if (
			!addressId ||
			!items ||
			!paymentMethod ||
			!Array.isArray(items) ||
			items.length === 0
		) {
			return NextResponse.json(
				{ error: "Missing Order details" },
				{ status: 401 }
			);
		}

		let coupon = null;
		if (couponCode) {
			coupon = await prisma.coupon.findFirst({
				where: {
					code: couponCode,
				},
			});
			if (!coupon) {
				return NextResponse.json(
					{
						error: "Coupon Not Found",
					},
					{ status: 404 }
				);
			}
		}

	
		//Check if Coupon is applicable for new users
		if (couponCode && coupon.forNewUser) {
			const userorder = await prisma.order.findMany({
				where: { userId },
			});
			if (userorder.length > 0) {
				return NextResponse.json(
					{
						error: "Coupon Valid For New User",
					},
					{ status: 400 }
				);
			}
		}
		const isPlusMember = has({ plan: "plus" });
		if (couponCode && coupon.forMember) {
			if (!isPlusMember) {
				return NextResponse.json(
					{
						error: "Coupon Valid For Members Only",
					},
					{ status: 400 }
				);
			}
		}

		//Group Orders by storeId using a map
		const ordersbyStore = new Map();

		for (const item of items) {
			const product = await prisma.product.findUnique({
				where: { id: item.id },
			});
			const storeId = product.storeId;
			if (!ordersbyStore.has(storeId)) {
				ordersbyStore.set(storeId, []);
			}
			ordersbyStore.get(storeId).push({ ...item, price: product.price });
		}
		let orderIds = [];
		let fullAmount = 0;

		let isShippingFeeAdded = false;

		//Create order for each seller
		for (const [storeId, sellerItems] of ordersbyStore.entries()) {
			let total = sellerItems.reduce(
				(acc, item) => acc + item.price * item.quantity,
				0
			);
			if (couponCode) [(total -= (total * coupon.discount) / 100)];
			if (!isPlusMember && !isShippingFeeAdded) {
				total += 5;
				isShippingFeeAdded = true;
			}
			fullAmount += parseFloat(total.toFixed(2));

			const order = await prisma.order.create({
				data: {
					userId,
					storeId,
					addressId,
					total: parseFloat(total.toFixed(2)),
					paymentMethod,
					isCouponUsed: coupon ? true : false,
					coupon: coupon ? coupon : {},
					orderItems: {
						create: sellerItems.map((item) => ({
							productId: item.id,
							quantity: item.quantity,
							price: item.price,
						})),
					},
				},
			});
			orderIds.push(order.id);
		}

	if (paymentMethod === "STRIPE") {
			const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
			const origin = await request.headers.get("origin");

			const session = await stripe.checkout.sessions.create({
				payment_method_types: ["card"],
				line_items: [
					{
						price_data: {
							currency: "usd",
							product_data: {
								name: "Order",
							},
							unit_amount: Math.round(Number(fullAmount) * 100),
						},
						quantity: 1,
					},
				],
				mode: "payment",
				expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes
				success_url: `${origin}/loading?nextUrl=orders`,
				cancel_url: `${origin}/cart`,
				metadata: {
					orderIds: orderIds.join(","),
					userId,
					appId: "gocart",
				},
			});

			return NextResponse.json({ session });
		}

		//clear the cart
		await prisma.user.update({
			where: { id: userId },
			data: { cart: {} },
		});
		return NextResponse.json({
			message: "Order Placed Sucessfully",
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: error.code || error.message },
			{ status: 400 }
		);
	}
}

// GET All orders for a user
export async function GET(request) {
	try {
		const { userId } = getAuth(request);
		const orders = await prisma.order.findMany({
			where: {
				userId,
				OR: [
					{ paymentMethod: PaymentMethod.COD },
					{
						AND: [
							{ paymentMethod: PaymentMethod.STRIPE },
							{ isPaid: true },
						],
					},
				],
			},
			include: {
				orderItems: { include: { product: true } },
				address: true,
			},
			orderBy: { createdAt: "desc" },
		});
		return NextResponse.json({ orders });
	} catch (error) {
		return NextResponse.json(
			{ error: error.code || error.message },
			{ status: 400 }
		);
	}
}
