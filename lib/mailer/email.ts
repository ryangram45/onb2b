import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendOtpEmail(
  to: string,
  code: string
) {
  await transporter.sendMail({
    from: `"no-reply" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your Login OTP Code",
    html: `
      <h2>Login Verification</h2>
      <p>Your OTP code is:</p>
      <h1>${code}</h1>
      <p>This code expires in 5 minutes.</p>
    `,
  });
}