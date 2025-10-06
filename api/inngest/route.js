import {
	syncUserCreation,
	syncUserDeletion,
	syncUserUpdation,
} from "@/inngest/funcitons";
import { serve } from "inngest/next";

export const { GET, POST, PUT } = serve({
	client: inngest,
	functions: [syncUserCreation, syncUserUpdation, syncUserDeletion],
});
