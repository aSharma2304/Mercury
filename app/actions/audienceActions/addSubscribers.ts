'use server'
import prisma from "@/lib/db";
import { isAuthenticated } from "@/utils/verifyUser";

type ExcelFormValues = {
  file: FileList;
  name?: unknown;
  email?: unknown;
};
type JSONFormValues = {
  json: string;
  name?: unknown;
  email?: unknown;
};

export const addSubscribersForm = async({email,name,audienceId}:{email:string,name:string,audienceId:string})=>{
    try{
      const isUserAuthenticated = await isAuthenticated();
      if(!isUserAuthenticated) return {
        status:"failed",
        message:"User not authenticated",
      }

      const addedSubscriber = await prisma.subscribers.create({
        data:{
          audience_id:audienceId,
          name:name,
          email:email,

        }
      })

      if(!addedSubscriber) return {
        message:"Failed to add subscriber",
        status:"failed",
      }
      return {
        status:"success",
        message:"Successfully Added subscriber",
        subscriber:addedSubscriber,
      }

    }catch(err:any){
      console.warn("Failed to add subscribers")
      return {
        status:"failed",
        message:"Failed to add subscribers"
      }
    }
}

export const addSubscribersAPI = async({url}:{url:string})=>{
    console.log("got url",url)
}
export const addSubscribersJson = async({json,name,email}:JSONFormValues)=>{
    console.log("got json",json)
}
export const addSubscribersExcel = async({file,name,email}:ExcelFormValues)=>{
    console.log("got file",file)
}

export const getAllSubscribers = async()=>{
  const res = await prisma.audiences.findMany({});
  return res;
}
