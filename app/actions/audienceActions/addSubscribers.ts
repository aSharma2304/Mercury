'use server'
import prisma from "@/lib/db";
import { isAuthenticated } from "@/utils/verifyUser";
import * as XLSX from "xlsx";

type ExcelFormValues = {
  file: FileList;
  name: string;
  email: string;
  audienceId:string
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

export const addSubscribersExcel = async ({
  file,
  name,
  email,
  audienceId
}: ExcelFormValues) => {
  try {
    // 1. Auth check
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
      return { status: "failed", message: "User not authenticated" };
    }

    // 2. Read file
    if (!file || file.length === 0) {
      return { status: "failed", message: "No file uploaded" };
    }

    const buffer = Buffer.from(await file[0].arrayBuffer());
    const workbook = XLSX.read(buffer, { type: "buffer" });

    const sheetName = workbook.SheetNames[0];
    if (!sheetName) {
      return { status: "failed", message: "No sheets found in file" };
    }

    // 3. Parse sheet
    const worksheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet);

    if (rows.length === 0) {
      return { status: "failed", message: "Excel sheet is empty" };
    }

    // 4. Validate columns
    const firstRow = rows[0];
    const missingColumns = [name, email].filter(
      col => !(col in firstRow)
    );

    if (missingColumns.length > 0) {
      return {
        status: "failed",
        message: `Missing columns: ${missingColumns.join(", ")}`
      };
    }

    // 5. Normalize data for DB
    const excelData = rows.map(row => ({
      name: String(row[name] ?? "").trim(),
      email: String(row[email] ?? "").trim(),
      audience_id: audienceId
    }));

    // // 6. Fetch existing subscribers
    // const currentSubscribers = await prisma.subscribers.findMany({
    //   where: { audience_id: audienceId },
    //   select: { email: true }
    // });

    // const existingEmails = new Set(
    //   currentSubscribers.map(sub => sub.email)
    // );

    // // 7. Filter duplicates
    // const newSubscribers = excelData.filter(
    //   sub => sub.email && !existingEmails.has(sub.email)
    // );

    // if (newSubscribers.length === 0) {
    //   return {
    //     status: "failed",
    //     message: "No new subscribers to add"
    //   };
    // }

    // // 8. Insert
    // await prisma.subscribers.createMany({
    //   data: newSubscribers
    // });

    const result = await prisma.subscribers.createMany({
      data: excelData,
      skipDuplicates: true
    });

    if (result.count === 0) {
      return {
        status: "failed",
        message: "All subscribers already exist"
      };
    }

    const updatedSubscribers = await prisma.subscribers.findMany({
      where:{
        audience_id:audienceId
      }
    })

    return {
      status: "success",
      message: `${result.count} subscribers added successfully`,
      subscribers:updatedSubscribers
    };
  } catch (err) {
    console.error("addSubscribersExcel error:", err);

    return {
      status: "failed",
      message: "Failed to import subscribers from Excel"
    };
  }
};

export const getAllSubscribers = async()=>{
  const res = await prisma.audiences.findMany({});
  return res;
}
