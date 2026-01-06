'use server'

import prisma from "@/lib/db";
import { isAuthenticated } from "@/utils/verifyUser"
import { currentUser } from "@clerk/nextjs/server";

export const addAudience = async({title,description}:{title:string, description:string})=>{

  try{
      const isUserAuthenticated = await isAuthenticated();
    const user = await currentUser();
    
    if(!isUserAuthenticated || !user) return {
        status:"failed",
        message:"User not authenticated"
    }


    if(!title.trim() || !description.trim()){
        return {
            status:"failed",
            message:"Title or description can't be empty"
        }
    }

    const dbUser = await prisma.users.findUnique({
        where: { clerkId: user.id },       
    });

    if(!dbUser) return {
            status:"failed",
            message:"No user found with this clerkId"
    }

    const newAudience = await prisma.audiences.create({
        data: {
            userId: dbUser.id,
            name: title,
            description
        }
    });

    return {
        status:"success",
        message:"Added Audience",
        audience:newAudience,
    }

  }catch(err:any){
    console.warn("Error while adding audience");
    return {
         status:"failed",
        message:"Error while adding audience",
        error:err,
    }

  }

}

export const editAudience = async(audienceId:string, values:{title:string, description:string})=>{
    try{
    const {title,description}= values;
    const isUserAuthenticated = await isAuthenticated();
    const user = await currentUser();
    
    if(!isUserAuthenticated || !user) return {
        status:"failed",
        message:"User not authenticated"
    }


    if(!title.trim() || !description.trim()){
        return {
            status:"failed",
            message:"Title or description can't be empty"
        }
    }

    const dbUser = await prisma.users.findUnique({
        where: { clerkId: user.id },       
    });

    if(!dbUser) return {
            status:"failed",
            message:"No user found with this clerkId"
    }

    const updatedAudience = await prisma.audiences.update({
        where:{
            id:audienceId
        },
        data: {
            name: title,
            description
        }
    });

    return {
        status:"success",
        message:"Updated Audience",
        audience:updatedAudience,
    }

  }catch(err:any){
    console.warn("Error while updating audience");
    return {
         status:"failed",
        message:"Error while updating audience",
        error:err,
    }

  }

}

export const getAudience = async(audienceId:string)=>{

    try{
        const isUserAuthenticated = await isAuthenticated();
    if(!isUserAuthenticated) return {
        status:"failed",
        message:"User not authenticated"
    }

    const audience = await prisma.audiences.findUnique({
        where:{
            id:audienceId
        }
    })

    if(!audience) return {
        status:"failed",
        message:"No audience found with this id",
    }

    return {
        status:"success",
        message:"Found Audience Successfully",
        audience:audience
    }

    }catch(err:any){
        console.warn("Error while fetching audience");
        return {
            status:"failed",
            message:"Error while fetching audience",
            error:err,
        }
    }
}
export const getAudiences = async()=>{

    try{
        const isUserAuthenticated = await isAuthenticated();
    if(!isUserAuthenticated) return {
        status:"failed",
        message:"User not authenticated"
    }

    const audiences = await prisma.audiences.findMany()

    return {
        status:"success",
        message:"Found Audiences Successfully",
        audiences:audiences
    }

    }catch(err:any){
        console.warn("Error while fetching audiences");
        return {
            status:"failed",
            message:"Error while fetching audiences",
            error:err,
        }
    }
}

export const getSubscribers = async(audienceId:string)=>{
    try{
        const isUserAuthenticated = await isAuthenticated();
        if(!isUserAuthenticated) return {
            status:"failed",
            message:"User not authenticated"
        }

        const audience = await prisma.audiences.findUnique({
            where:{
                id:audienceId,
            }
        })

        if(!audience) return {
            status:"failed",
            message:"No audience with this id exists"
        }

        const subscribers = await prisma.subscribers.findMany({
            where:{
                audience_id:audienceId,
            }
        })

        return {
            status:"success",
            message:"Got subscribers Successfully",
            subscribers:subscribers
        }
        
    }catch(err:any){
        console.warn(("Error fetching subscribers"))
        return {
            status:"failed",
            message:"Error while fetching subscribers",
        }

    }

}

export const deleteAudience = async(audienceId:string)=>{
    try{

        const isUserAuthenticated = await isAuthenticated();
        if(!isUserAuthenticated) return {
            status:"failed",
            message:"User not authenticated"
        }
        
        const user = await currentUser();

        const foundUser = await prisma.users.findUnique({
            where:{
                clerkId:user?.id
            }
        })

        const audience = await prisma.audiences.findUnique({
            where:{
                id:audienceId,
                userId:foundUser?.id
            }
        })

        if(!audience) return {
            status:"failed",
            message:"No audience with this id exists"
        }

        await prisma.audiences.delete({
            where:{
                id:audienceId,
                userId:foundUser?.id
            }
        })
        
        return {
            status:"success",
            message:"Successfully deleted audience"
        }
        
    }catch(err:any){
        console.warn("Error while deleting audience", err.message);
        return {
            status:"failed",
            message:"Failed to delete audience"
        }
    }
}