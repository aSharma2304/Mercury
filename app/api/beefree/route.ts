import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { IToken } from "@beefree.io/sdk/dist/types/bee";

export async function POST(req: NextRequest) :Promise<any>{
    
  const beeFreeClientId = process.env.NEXT_PUBLIC_BEEFREE_ID;
  const beeFreeClientSecret = process.env.NEXT_PUBLIC_BEEFREE_SECRET;

  if (!beeFreeClientId || !beeFreeClientSecret) {
    return NextResponse.json(
      { error: "BeeFree environment variables missing" },
      { status: 500 }
    );
  }

  const body: { uid?: string } = await req.json();
  const uid = body.uid ?? "demo-user";

  try {
  const response = await axios.post(
    "https://auth.getbee.io/loginV2",
    {
      client_id: beeFreeClientId,
      client_secret: beeFreeClientSecret,
      uid,
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  return NextResponse.json({ token: response.data }, { status: 200 });


  } catch (err: any) {
    console.error("Error while POST request to BeeFree:", err.message);

    return NextResponse.json(
      { error: "Failed to authenticate" },
      { status: 500 }
    );
  }
}
