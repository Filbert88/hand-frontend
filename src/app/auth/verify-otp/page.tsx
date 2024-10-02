"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Toaster, toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

    try {
      const response = await fetch(`${API_URL}/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone_number: phoneNumber, otp }),
      });

      if (response.ok) {
        toast.success("OTP verified successfully!");

        setTimeout(() => {
          router.push("auth/login");
        }, 1500);
      } else {
        const errorData = await response.json();
        toast.error(`OTP verification failed: ${errorData.message}`);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Verify your OTP</h1>
      <form
        onSubmit={handleVerifyOTP}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <label className="block mb-2 text-sm text-gray-700">
          Enter OTP sent to your phone
        </label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border rounded-lg p-2 mb-4 w-full text-sm bg-gray-100"
        />
        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 w-full"
        >
          Verify OTP
        </button>
      </form>

      {/* Toaster for feedback */}
      <Toaster position="bottom-right" richColors />
    </div>
  );
};

export default OTPVerification;
