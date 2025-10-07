import prisma from "@/lib/prisma";
import authAdmin from "@/middlewares/authAdmin";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

//Add new Coupon
export async function POST(request) {
	try {
		const { userId } = getAuth(request);
		const isAdmin = await authAdmin(userId);

		if (!isAdmin) {
			return NextResponse.json(
				{ error: "Not Authorized" },
				{ status: 401 }
			);
		}
		const { coupon } = await request.json();
		coupon.code = coupon.code.toUpperCase();
		await prisma.coupon.create({ data: coupon });

		return NextResponse.json({ message: "Coupon added Succesfully" });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: error.code || error.message },
			{ status: 400 }
		);
	}
}

//Delete any coupon

export async function DELETE(request) {
	try {
		const { userId } = getAuth(request);
		const isAdmin = await authAdmin(userId);

		if (!isAdmin) {
			return NextResponse.json(
				{ error: "Not Authorized" },
				{ status: 401 }
			);
		}

		const url = new URL(request.url);
		const code = url.searchParams.get("code");

		await prisma.coupon.delete({
			where: { code },
		});
		return NextResponse.json({ message: "Coupon deleted Succesfully" });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: error.code || error.message },
			{ status: 400 }
		);
	}
}

//Get All COunpon
export async function GET(request) {
	try {
		const { userId } = getAuth(request);
		const isAdmin = await authAdmin(userId);

		if (!isAdmin) {
			return NextResponse.json(
				{ error: "Not Authorized" },
				{ status: 401 }
			);
		}
		const coupons = await prisma.coupon.findMany({});

		return NextResponse.json({ coupons });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: error.code || error.message },
			{ status: 400 }
		);
	}
}
