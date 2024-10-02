"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Toaster, toast } from "sonner";
import { verifyOTP } from "@/app/api/verify-otp"; // Import the OTP verification API function

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState("");
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("phoneNumber");
  const router = useRouter();

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || !phoneNumber) {
      toast.error("Please enter the OTP and phone number");
      return;
    }

    const result = await verifyOTP(phoneNumber, otp);

    if (result.success) {
      toast.success("OTP verified successfully!");

      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    } else {
      toast.error(`OTP verification failed: ${result.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleVerifyOTP}>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
        />
        <button type="submit">Verify OTP</button>
      </form>
      <Toaster position="bottom-right" richColors />
    </div>
  );
};

export default OTPVerification;
