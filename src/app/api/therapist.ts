export async function getTherapistDetails(therapistId: string) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/therapist/${therapistId}/details`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      return data.therapist; // Assuming the therapist is returned as a key in the object
    } else {
      throw new Error(data.message || "Error fetching therapist details");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function getTherapistSchedule(
  therapistId: string,
  date: string | null = null, // Change date type to string | null
  consultationType: string | null = null // Ensure consultationType is string | null
) {
  let queryParams = `?`;
  if (date) {
    queryParams += `date=${date}&`;
  }
  if (consultationType) {
    queryParams += `type=${consultationType}`;
  }

  try {
    const response = await fetch(
      `http://localhost:8080/api/therapist/${therapistId}/schedule${queryParams}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
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
