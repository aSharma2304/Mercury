'use server'
import prisma from "@/lib/db";

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

export const addSubscribersForm = async({email,name}:{email:string,name:string})=>{
    console.log("got ", email, "and",name)
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
