//get store info & store Products

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url);
		const username = searchParams.get("username").toLocaleLowerCase();

		if (!username) {
			return NextResponse.json(
				{ error: "missing Username" },
				{ status: 401 }
			);
		}

		//get store info and InStock Products with ratings
		const store = await prisma.store.findUnique({
			where: { username, isActive: true },

			include: { Product: { include: { rating: true } } },
		});

		if (!store) {
			return NextResponse.json(
				{ error: "Store Not Found" },
				{ status: 401 }
			);
		}

		return NextResponse.json({ store });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: error.code || error.message },
			{ status: 400 }
		);
	}
}
 