import authAdmin from "@/middlewares/authAdmin";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
//Auth Admin
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

		return NextResponse.json({ isAdmin });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: error.code || error.message },
			{ status: 400 }
		);
	}
}
