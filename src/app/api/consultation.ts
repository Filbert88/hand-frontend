import { getToken } from "@/utils/function";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchTherapists(
  dateStr = "",
  consultationType = "",
  location = ""
) {
  const token = await getToken();
  try {
    const response = await fetch(
      `${API_URL}/therapists?consultation=${consultationType}&location=${location}&date=${dateStr}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      if (data.length === 0) {
        return {
          therapists: [],
          errorMessage: "No therapists found for the selected criteria.",
        };
      }
      return { therapists: data, errorMessage: "" };
    } else {
      return { therapists: [], errorMessage: "Error fetching therapists." };
    }
  } catch (error) {
    console.error("Error fetching therapists:", error);
    return { therapists: [], errorMessage: "Error fetching therapists." };
  }
}
