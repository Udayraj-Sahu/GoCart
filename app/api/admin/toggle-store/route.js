import prisma from "@/lib/prisma";
import authAdmin from "@/middlewares/authAdmin";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

//Toggle Store isActive
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

		const { storeId } = await request.json();

		if (!storeId) {
			return NextResponse.json(
				{ error: "missing StoreId" },
				{ status: 400 }
			);
		}

		//Find the Store
		const store = await prisma.store.findUnique({
			where: { id: storeId },
		});
		3;

		if (!store) {
			return NextResponse.json(
				{ error: "Store not FOunddd" },
				{ status: 400 }
			);
		}

		await prisma.store.update({
			where: { id: storeId },
			data: { isActive: !store.isActive },
		});

		return NextResponse.json({ message: "Store Updated Successfully" });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: error.code || error.message },
			{ status: 400 }
		);
	}
}
