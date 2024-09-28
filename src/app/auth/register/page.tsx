import React from "react";
import RegisterForm from "@/components/register/RegisterForm";

const Register: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-center mb-4">Welcome to Hand!</h1>
      <RegisterForm />
    </div>
  );
};

export default Register;
