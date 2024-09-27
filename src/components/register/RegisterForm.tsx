"use client"; // This will ensure the component is treated as a Client Component

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";

// InputField component for reusability
interface InputFieldProps {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm text-gray-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border rounded-lg p-2 w-full text-sm bg-gray-100 placeholder-gray-400"
      />
    </div>
  );
};

const RegisterForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!name || !email || !password || !confirmPassword || !phoneNumber) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Prepare data for API call
    const data = {
      name,
      email,
      password,
      phone_number: phoneNumber,
      role: "patient", // Default role as "patient"
    };

    try {
      // Call the API
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Handle API response
      if (response.ok) {
        toast.success("Registration successful!");

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPhoneNumber("");

        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        const errorData = await response.json();
        toast.error(`Registration failed: ${errorData.message}`);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col space-y-4 bg-white shadow-lg p-8 rounded-lg max-w-lg mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="What’s your name?"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputField
            label="Make a password!"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="What’s your email?"
            placeholder="example@service.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="Confirm your password!"
            placeholder="we'll make sure your account is safe!"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <InputField
          label="What's your phone number?"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <button
          type="submit"
          className="mt-6 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-all w-full"
        >
          Sign Me Up
        </button>
      </form>

      {/* Toaster for feedback */}
      <Toaster position="bottom-right" richColors />
    </div>
  );
};

export default RegisterForm;
