"use server"

import prisma from "@/lib/db";
import { Mail } from "@/types/MailType"
import { isAuthenticated } from "@/utils/verifyUser"
import { currentUser } from "@clerk/nextjs/server";

export const saveMail = async(mail:Mail)=>{
    try{
        const isUserAuthenticated = await isAuthenticated();
      if(!isUserAuthenticated) return {
        status:"failed",
        message:"User not authenticated",
      }

    const user = await currentUser();
    const foundUser = await prisma.users.findUnique({
        where:{
            clerkId:user?.id
        }
    })

    if(!foundUser){
        return {
            status:"failed",
            message:"failed to find user with this id"
        }
    }

    const alreadyMail  = await prisma.email_template.findFirst({
        where:{
            title:mail.title,
            user_id:foundUser?.id
        }
    })

    if(alreadyMail){
        return {
            status:"failed",
            message:"You already have a mail with this title"
        }
    }

    const newMail = await prisma.email_template.create({
        data:{
            title:mail.title,
            description:mail.description,
            reply_to:mail.reply_to,
            subject:mail.subject,
            body:mail.body,
            html_content:mail.pageHtml,
            json_content:mail.pageJson,
            user_id:foundUser?.id

        }
    })

    if(newMail){
        return {
            status:"success",
            message:"Successfully created Mail",
            mail:newMail
        }
    }

    }catch(err){
        console.warn("error while creating mail");
        return {
            status:"failed",
            message:"Failed to create mail"
        }

    }

}

export const getMails = async()=>{
    try{
        const isUserAuthenticated = await isAuthenticated();
        if(!isUserAuthenticated){
            return {
                status:"failed",
                message:"User not authenticated",
            }
        }

        const user = await currentUser();

        const foundUser = await prisma.users.findUnique({
            where:{
                clerkId:user?.id
            }
        })

        if(!foundUser){
            return {
                status:"failed",
                message:"User not found with this id",
            }
        }

        const mails = await prisma.email_template.findMany({

            where:{
                user_id:foundUser.id,
            }
        })

        return {
            status:"success",
            message:"Got mails successfully",
            mails:mails,
        }
                
    }catch(err:any){
        console.warn("Error while fetching mails",err.message);
        return {
            status:"failed",
            message:"Failed to fetch mails"
        }
    }
}

export const deleteMail = async (mailId: string) => {
    try {

        const isUserAuthenticated = await isAuthenticated();
        if (!isUserAuthenticated) return {
            status: "failed",
            message: "User not authenticated"
        }

        const user = await currentUser();

        const foundUser = await prisma.users.findUnique({
            where: {
                clerkId: user?.id
            }
        });

        const mail = await prisma.email_template.findUnique({
            where: {
                id: mailId,
                user_id: foundUser?.id
            }
        });

        if (!mail) return {
            status: "failed",
            message: "No mail with this id exists"
        }

        await prisma.email_template.delete({
            where: {
                id: mailId,
                user_id: foundUser?.id
            }
        })

        return {
            status: "success",
            message: "Successfully deleted mail"
        }

    } catch (err: any) {
        console.warn("Error while deleting mail", err.message);
        return {
            status: "failed",
            message: "Failed to delete mail"
        }
    }
}
