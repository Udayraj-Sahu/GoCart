//toggle stock of a product

import prisma from "@/lib/prisma";
import authSeller from "@/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { err } from "inngest/types";
import { NextResponse } from "next/server";

export async function POST(request) {
	try {
		const { userId } = await getAuth(request);
		const { productId } = await request.json();

		if (!productId) {
			return NextResponse.json(
				{ error: "missing detaisl: ProductId" },
				{ status: 400 }
			);
		}

		const storeId = await authSeller(userId);
		if (!storeId) {
			return NextResponse.json(
				{ error: "Not authoreized" },
				{ status: 401 }
			);
		}
		//check if Product Exist
		const product = await prisma.product.findFirst({
			where: { id: productId, storeId },
		});

		if (!product) {
			return NextResponse.json(
				{ error: " no product found" },
				{ status: 404 }
			);
		}

		await prisma.product.update({
			where: { id: productId },
			data: { inStock: !product.inStock },
		});
	} catch (error) {
        console.error(error);
		return NextResponse.json(
			{ error: error.code || error.message },
			{ status: 400 }
		);
    }
}
