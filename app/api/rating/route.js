//Add New Rating

import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
	try {
		const { userId } = getAuth(request);
		const { orderId, productId, rating, review } = await request.json();

		const order = await prisma.order.findUnique({
			where: { id: orderId, userId },
		});

		if (!order) {
			return NextResponse.json(
				{ error: "Order Not Found" },
				{ status: 404 }
			);
		}

		const isAlreadyRated = await prisma.rating.findFirst({
			where: { productId, orderId },
		});

		if (isAlreadyRated) {
			return NextResponse.json(
				{ error: "Product Already Rated" },
				{ status: 400 }
			);
		}
		const response = await prisma.rating.create({
			data: { userId, productId, rating, review, orderId },
		});

		return NextResponse.json({
			message: "Rating added Sucessfully",
			rating: response,
		});
	} catch (error) {
		return NextResponse.json(
			{ error: error.code || error.message },
			{ status: 400 }
		);
	}
}

//Get All rating for a user

export async function GET(request) {
	try {
		const { userId } = getAuth(request);
		if (!userId) {
			return NextResponse.json({ error: "Unathorized" }, { status: 401 });
		}
		const rating = await prisma.rating.findMany({
			where: { userId },
		});
		return NextResponse.json({ rating });
	} catch (error) {
		return NextResponse.json(
			{ error: error.code || error.message },
			{ status: 400 }
		);
	}
}
