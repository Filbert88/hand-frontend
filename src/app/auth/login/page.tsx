import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginPage from "./loginClient";

export default function page() {
  const cookieStore = cookies();
  const authToken = cookieStore.get("authToken");

  if (authToken) {
    redirect("/");
  }
  return (
    <div>
      <LoginPage />
    </div>
  );
}
