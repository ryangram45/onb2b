import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import dbConnect from "@/lib/db/mongodb";
import OtpSession from "@/lib/models/OtpSession";
import { generateOtp } from "@/utils/otp";
import { sendWireAuthorizationOtp } from "@/lib/mailer/email";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const otpCode = generateOtp();

    await OtpSession.deleteMany({ userId: session.user.id });
    await OtpSession.create({
      userId: session.user.id,
      code: otpCode,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    });

    await sendWireAuthorizationOtp(session.user.email, otpCode);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/me/send-wire-otp error:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
