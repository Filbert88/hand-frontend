const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { getToken } from "@/utils/function";
export async function getTherapistDetails(therapistId: string) {
  const token = await getToken();
  try {
    const response = await fetch(
      `${API_URL}/therapist/${therapistId}/details`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      return data.therapist;
    } else {
      throw new Error(data.message || "Error fetching therapist details");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function getTherapistSchedule(
  therapistId: string,
  date: string | null = null,
  consultationType: string | null = null
) {
  const token = await getToken();
  let queryParams = `?`;
  if (date) {
    queryParams += `date=${date}&`;
  }
  if (consultationType) {
    queryParams += `type=${consultationType}`;
  }

  try {
    const response = await fetch(
      `${API_URL}/therapist/${therapistId}/schedule${queryParams}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || "Error fetching therapist schedule");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export interface Therapist {
  name: string;
  location: string;
  image_url: string;
  appointment_rate: number;
  consultation_type: string;
  phone_number: string;
  specialization: string;
}

export interface Schedule {
  time: string;
  available: boolean;
}
