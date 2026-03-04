import dbConnect from "@/lib/db/mongodb";
import { signupSchema } from "@/lib/dto/zod-schemas";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("from sign up:", body);
    const data = signupSchema.parse(body);

    await dbConnect();

    {
      /*check if user already exist */
    }
    const existingUser = await User.findOne({
      $or: [{ email: data.email }, { userId: data.userId }],
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);

    await User.create({
      ...data,
      password: passwordHash,
    });

    return NextResponse.json({
      success: true,
      message: "Account created successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: error, message: "Signup failed" },
      { status: 500 },
    );
  }
}
