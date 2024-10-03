import React from "react";
import RegisterForm from "@/components/register/RegisterForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Register: React.FC = () => {
  const cookieStore = cookies();
  const authToken = cookieStore.get("authToken");

  if (authToken) {
    redirect("/");
  }
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-center mb-4 font-gloock">Welcome to Hand!</h1>
      <RegisterForm />
    </div>
  );
};

export default Register;
