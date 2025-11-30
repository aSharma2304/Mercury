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

      const updatedAudience = await prisma.audiences.update({
        where:{
          id:audienceId,
        },
        data:{
          subscriber_count:{
            increment: 1
          }
        }
      })

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

export const addSubscribersJson = async (
  json: string,
  nameKey: string,
  emailKey: string,
  audienceId: string
) => {
  try {
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
      return { status: "failed", message: "User not authenticated" };
    }

    let jsonBody: any[];
    try {
      jsonBody = JSON.parse(json);
    } catch {
      return { status: "failed", message: "Invalid JSON format" };
    }

    if (!Array.isArray(jsonBody)) {
      return { status: "failed", message: "JSON should be an array of objects" };
    }

    jsonBody = jsonBody.slice(0, 50);

    const valuePairs = jsonBody
      .map((sub) => ({
        name: sub[nameKey],
        email: sub[emailKey],
        audience_id: audienceId,
      }))
      .filter((s) => s.name && s.email);

    if (!valuePairs.length) {
      return { status: "failed", message: "No valid entries found in JSON" };
    }

    await prisma.subscribers.createMany({
      data: valuePairs,
      skipDuplicates: true,
    });

    return { status: "success", message: "Added subscribers successfully" };
  } catch (err: any) {
    console.error("Error while saving JSON subscribers:", err.message);
    return { status: "failed", message: "Failed to add subscribers using JSON" };
  }
};

export const addSubscribersExcel = async({file,name,email}:ExcelFormValues)=>{
    console.log("got file",file)
}

export const getAllSubscribers = async()=>{
  const res = await prisma.audiences.findMany({});
  return res;
}
