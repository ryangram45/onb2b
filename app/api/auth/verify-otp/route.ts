import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import OtpSession from "@/lib/models/OtpSession";
import { getToken } from "next-auth/jwt";

export async function POST(req: Request) {
  await dbConnect();

  const { code } = await req.json();

  const token = await getToken({
    req: req as any,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const record = await OtpSession.findOne({
    userId: token.id,
    code,
  });

  if (!record) {
    return NextResponse.json(
      { error: "Invalid or expired OTP" },
      { status: 400 }
    );
  }

  await OtpSession.deleteMany({ userId: token.id });

  return NextResponse.json({ success: true });
}