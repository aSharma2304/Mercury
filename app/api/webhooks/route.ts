import prisma from "@/lib/db";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
// import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const { id } = evt.data;
    const eventType = evt.type;
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`
    );

    if (eventType === "user.created") {
      const { id, first_name, last_name } = evt.data;
      await prisma.users.upsert({
        where: {
          clerkId: id,
        },
        create: {
          clerkId: id,
          username: `${first_name} ${last_name}`,
        },
        update: {
          username: `${first_name} ${last_name}`,
        },
      });
    }

    return new Response("Webhook received", { status: 200 });

  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}