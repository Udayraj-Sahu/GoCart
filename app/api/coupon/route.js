import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

//verify Coupon
export async function POST(request) {
	try {
		const { userId, has } = getAuth(request);
		const { code } = await request.json();

		const coupon = await prisma.coupon.findFirst({
			where: {
				code: code.toUpperCase(),
				expiresAt: { gt: new Date() },
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

		if (coupon.forNewUser) {
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

		if (coupon.forMember) {
			const hasPlusPlan = has({ plan: "plus" });
			if (!hasPlusPlan) {
				return NextResponse.json(
					{
						error: "Coupon Valid For Members Only",
					},
					{ status: 400 }
				);
			}
		}
		return NextResponse.json({ coupon });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: error.code || error.message },
			{ status: 400 }
		);
	}
}
