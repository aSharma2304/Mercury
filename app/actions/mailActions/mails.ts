"use server"

import prisma from "@/lib/db";
import { Mail } from "@/types/MailType"
import { isAuthenticated } from "@/utils/verifyUser"
import { auth, currentUser } from "@clerk/nextjs/server";

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