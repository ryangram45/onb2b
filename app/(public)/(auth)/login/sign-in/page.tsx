"use client";
import React from "react";
import { MdLock } from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginFormSchema } from "@/lib/dto/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import HeaderBanner from "@/app/(public)/_components/header-banner";
import { loginHelpLinks, onlineBankingLinks } from "@/app/(public)/data"
import { cn } from "@/lib/utils";
import { getSession } from "next-auth/react";
import { UserRole } from "@/lib/constants/roles";

type LoginFormValues = z.infer<typeof loginFormSchema>;

const Login = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      userId:
        typeof window !== "undefined"
          ? localStorage.getItem("savedUserId") || ""
          : "",
      password: "",
      rememberUserId: !!(
        typeof window !== "undefined" && localStorage.getItem("savedUserId")
      ),
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
  const response = await signIn("credentials", {
    redirect: false,
    userId: data.userId,
    password: data.password,
  });

  if (!response || response.error) {
    toast("Incorrect user ID or password");
    return;
  }

  if (data.rememberUserId) {
    localStorage.setItem("savedUserId", data.userId);
  } else {
    localStorage.removeItem("savedUserId");
  }

  const session = await getSession();

  // OTP required
  if ((session as any)?.otpPending) {
    router.push("/otp");
    return;
  }

  if (session?.user?.role === UserRole.ADMIN) {
    router.push("/admin/dashboard");
  } else {
    router.push("/home/account");
  }
};

  return (
    <section className="flex flex-col container mx-auto inset-x-0 md:max-w-[60rem] gap-2">
      <HeaderBanner />

      {/* Row 2 */}
      <div className="container mx-auto py-3 px-5 flex justify-between">
        <div className="Logo-container flex items-center gap-2 text-gray-500">
          <Image
            src={"/images/fullLogo.svg"}
            alt={`logo`}
            width={190}
            height={52}
            className="object-contain"
          />

          <span className="text-base ml-3 text-gray-700">Log In</span>
        </div>

        <div className="flex items-center text-gray-700/80 font-medium gap-2.5">
          <p className="flex items-center gap-1 px-2 border-r-2 border-dotted">
            <MdLock />
            Secure Area
          </p>
          <p className="text-gray-500 font-normal hidden sm:block">
            En español
          </p>
        </div>
      </div>

      {/* Row 3 */}
      <div className="bg-onb2b-red-450 text-white py-3 px-6 sm:px-19 lg:px-6 sm:text-[1.089rem] lg:text-[1.2rem]">
        Log In to Online Banking
      </div>

      {/* Row 4 */}
      <div className="container mx-auto px-6 sm:px-5 py-8 grow flex flex-col md:flex-row gap-8 md:gap-12 items-start mb-8">

        {/* Left Column */}
        <div className="w-full md:w-5/12 lg:w-4/12">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
            <Label htmlFor="UserId" className="text-lg font-normal text-black/70">User ID</Label>
            <Input id="UserId" {...register("userId")} className="shadow-none rounded-none focus-visible:ring-0 focus-visible:border-black focus-visible:border-2 py-0.5 h-auto"/>
            {errors.userId && (
              <p className="text-red-500 text-sm">{errors.userId.message}</p>
            )}

            <label className="flex items-center gap-2 text-[0.836rem] mt-2 mb-9">
              <Checkbox
                id="rememberUserId"
                {...register("rememberUserId")}
                className="cursor-pointer shadow-none"
              />
              <p>Save this User Id</p>
            </label>

            <Label htmlFor="Password" className="text-lg font-normal text-black/70">Password</Label>
            <Input id="Password" type="password" {...register("password")} className="shadow-none rounded-none focus-visible:ring-0 focus-visible:border-black focus-visible:border-2 py-0.5 h-auto"/>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <div className="mt-4 mb-7 text-xs text-blue-700">
              <a href="#" className="hover:underline">
                Forgot your Password?
              </a>
            </div>

            <Button
              size="xs"
              type="submit"
              className="text-white bg-blue-800 border hover:bg-onb2b-blue-800/90 border-blue-900 rounded py-1 px-0 text-sm h-auto max-w-22 flex items-center gap-1.5 transform transition-all duration-300 ease-in-out cursor-pointer"
            >
              <MdLock className="size-4"/>
              <p className="font-medium">Log In</p>
            </Button>
          </form>
        </div>

        <div className="flex lg:border-l border-gray-300/50 py-4">
          {/* Middle Column */}
          <div className="w-full items-center text-left">
            <h3 className="text-lg font-normal text-gray-700 mb-5 lg:px-10">
              Stay connected with our app
            </h3>

            <div className="flex items-center">
              <div className="relative w-full lg:w-80 max-w-xs aspect-[3/3]">
                <Image
                  src="/images/mobile_sign-in.png"
                  alt="Bank of America Mobile App"
                  fill
                  className="object-contain"
                />
              </div>

              <h2>
                <p className="text-base text-gray-800 mb-4">
                  Secure, convenient banking anytime
                </p>

                <Button variant="default" size="xs" className="bg-[#cb1331] hover:bg-onb2b-red-800 cursor-pointer h-auto py-2 px-4 text-white text-sm font-medium max-w-xs">
                  Get the app
                </Button>
              </h2>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-[50%] text-sm text-blue-700 space-y-4 tracking-wide ">
            <h4 className="text-sm font-semibold text-gray-900 mb-4 border-b border-gray-300/50 pb-2">
              Login help
            </h4>

            {/* Login Help Links*/}
            <ul className="space-y-2">
              {loginHelpLinks.map((text, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-onb2b-blue-600 hover:underline text-xs">
                    {text}
                  </a>
                </li>
              ))}
            </ul>

            <div className="pt-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-4 border-b border-gray-300/50 pb-2">
                Not using Online Banking?
              </h4>

              {/* Online banking Links*/}
              <ul className="space-y-2">
                {onlineBankingLinks.map((text, index) => (
                  <li key={index}>
                    <a href="#" className="hover:text-onb2b2-600 hover:underline text-xs">
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full bg-[#f3efea] py-6 px-9 sm:px-20 lg:px-7 space-y-2 text-[0.720rem] sm:text-[0.920rem]">
        <p className="flex items-center gap-1 text-[0.878rem] font-bold text-gray-700/80">
          <MdLock />
          Secure Area
        </p>

        <div className="flex">
          {["Privacy", "Security", "Your Privacy Choices"].map(
           (value, index, array) => (
            <div key={index} className="flex items-center gap-3 text-xs text-onb2b-blue-800/60">
              <span>{value}</span>

              <span
                className={cn(
                  "h-3.5 border-r mr-4 border-onb2b-blue-800",
                  index === array.length - 1 && "hidden"
                )}
                />
            </div>
          )
        )}
        </div>

        {/* {index === array.length - 1 && (
        <Image
          src="/images/privacy-choices.png"
          alt="Your Privacy Choices icon"
          width={16}
          height={16}
          className="h-6 w-6 object-contain mix-blend-multiply"
        />
      )} */}
        <h3 className="text-xs">
          Bank of America, N.A Member FDIC. <span className="text-onb2b-blue-800/60">Equal Housing Lender</span>
        </h3>

        <p className="-mt-1 text-xs">
          &copy; 2026 Bank of America Corporation
        </p>
      </div>
    </section>
  );
};

export default Login;