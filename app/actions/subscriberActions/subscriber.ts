'use server'
import prisma from "@/lib/db";
import { isAuthenticated } from "@/utils/verifyUser";
import { currentUser } from "@clerk/nextjs/server";


export const deleteSubscriber = async (subscriberId: string) => {
    try {

        const isUserAuthenticated = await isAuthenticated();
        if (!isUserAuthenticated) return {
            status: "failed",
            message: "User not authenticated"
        };

        const user = await currentUser();

        const foundUser = await prisma.users.findUnique({
            where: {
                clerkId: user?.id
            }
        });

        const subscriber = await prisma.subscribers.findFirst({
            where: {
                id: subscriberId,
                audience: {
                    userId: foundUser?.id
                }
            }
        });

        if (!subscriber) return {
            status: "failed",
            message: "Subscriber not found or does not belong to this user"
        };

        await prisma.subscribers.delete({
            where: { id: subscriberId }
        });

        return {
            status: "success",
            message: "Subscriber deleted successfully"
        };

    } catch (err: any) {
        console.warn("Error deleting subscriber:", err.message);
        return {
            status: "failed",
            message: "Failed to delete subscriber"
        };
    }
};
