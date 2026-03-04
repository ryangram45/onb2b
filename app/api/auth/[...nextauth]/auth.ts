import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/db/db";
import { loginFormSchema } from "@/lib/dto/zod-schemas";
import dbConnect from "@/lib/db/mongodb";
import bcrypt from "bcryptjs";
import User from "@/lib/models/User";
import { UserRole, UserRoleType } from "@/lib/constants/roles";
import { AuthOptions } from "next-auth";
import { generateOtp } from "@/utils/otp";
import OtpSession from "@/lib/models/OtpSession";
import { sendOtpEmail } from "@/lib/mailer/email";

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userId: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const parsed = loginFormSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { userId, password } = parsed.data;

        await dbConnect();

        const inputId = (userId || "").trim();
        const user = await User.findOne({ userId: inputId });
        if (!user) return null;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        // ADMIN: direct login 
        if (user.role === UserRole.ADMIN) {
          return {
            id: user._id.toString(),
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            fullName: user.fullName,
            otpPending: false,
          };
        }

        // CLIENT: require OTP
        const code = generateOtp();

        await OtpSession.deleteMany({ userId: user._id });

        await OtpSession.create({
          userId: user._id,
          code,
          expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        });

        await sendOtpEmail(user.email, code);

        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role as UserRoleType,
          firstName: user.firstName,
          fullName: user.fullName,
          otpPending: true,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.firstName = (user as any).firstName;
        token.fullName = (user as any).fullName;
        token.otpPending = (user as any).otpPending ?? false;
      }
      if (trigger === "update") {
        if ((session as any)?.otpPending !== undefined) {
          token.otpPending = (session as any).otpPending as boolean;
        }
        if (session?.user) {
          if (session.user.firstName) token.firstName = session.user.firstName;
          if (session.user.fullName) token.fullName = session.user.fullName;
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        role: token.role as string,
        firstName: token.firstName as string,
        fullName: token.fullName as string,
      };

      (session as any).otpPending = token.otpPending;

      return session;
    },
  },
};
