"use client";

import React, { useState, useEffect, useRef } from "react";
import { Toaster, toast } from "sonner";
import { sendOTP, verifyOTP } from "@/app/api/verify-otp";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    async function sendOtpToUser() {
      const response = await sendOTP();
      if (response.success) {
        toast.success("OTP sent to your phone number.");
      } else {
        toast.error(response.message || "Failed to send OTP");
      }
    }
    sendOtpToUser();
  }, []);

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const otpString = otp.join("");
    const result = await verifyOTP(otpString);

    if (result.success) {
      toast.success("OTP verified successfully!");
      setTimeout(() => {
        router.push("/profile");
      }, 500);
    } else {
      toast.error(`OTP verification failed: ${result.message}`);
    }

    setLoading(false);
  };

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== "" && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F8FF] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Verify OTP
          </CardTitle>
          <CardDescription className="text-center">
            Enter the 6-digit code sent to your phone
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerifyOTP}>
            <div className="flex justify-between mb-6">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }} // Adjusted ref callback to not return a value
                  className="w-12 h-12 text-center text-2xl border-2 rounded-md"
                />
              ))}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <Button variant="link" onClick={() => sendOTP()}>
            Resend OTP
          </Button>
        </CardFooter>
      </Card>
      <Toaster position="bottom-right" richColors />
    </div>
  );
};

export default OTPVerification;
