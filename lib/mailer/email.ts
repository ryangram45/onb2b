import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

async function sendEmail({ to, subject, html }: EmailOptions) {
  await transporter.sendMail({
    from: `"no-reply" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}

export async function sendOtpEmail(to: string, code: string) {
  await sendEmail({
    to,
    subject: "Your Login OTP Code",
    html: `
      <h2>Login Verification</h2>
      <p>Your OTP code is:</p>
      <h1>${code}</h1>
      <p>This code expires in 10 minutes.</p>
    `,
  });
}

export async function sendGiftOtp(to: string, code: string) {
  await sendEmail({
    to,
    subject: "Make Pass Authorization OTP",
    html: `
      <h2>Gift Goal Authorization</h2>
      <p>Your authorization code is:</p>
      <h1>${code}</h1>
      <p>This code expires in 10 minutes. If you did not request this, please contact support immediately.</p>
    `,
  });
}
