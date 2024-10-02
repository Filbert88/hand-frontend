const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Function to verify OTP
export async function verifyOTP(phoneNumber: string, otp: string) {
  try {
    const response = await fetch(`${API_URL}/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone_number: phoneNumber, otp }),
    });

    const data = await response.json();
    if (response.ok) {
      return { success: true, data };
    } else {
      throw new Error(data.message || "OTP verification failed");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error verifying OTP:", error.message);
      return { success: false, message: error.message };
    } else {
      console.error("Unknown error verifying OTP");
      return { success: false, message: "An unknown error occurred" };
    }
  }
}
