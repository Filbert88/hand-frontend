export async function createAppointment(appointmentData: {
  therapistId: string;
  date: Date;
  consultationType: string;
}) {
  try {
    // Ensure date is in ISO format (RFC3339) to match backend format
    const formattedDate = appointmentData.date.toISOString();

    const response = await fetch(
      "http://localhost:8080/api/appointment/create-appointment",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          therapist_id: appointmentData.therapistId,
          date: formattedDate,
          consultation_type: appointmentData.consultationType,
        }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      console.log("Appointment Created:", data);
      return data;
    } else {
      throw new Error(data.message || "Error creating appointment");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function fetchAppointmentHistory(
  status?: string
): Promise<AppointmentHistory[]> {
  try {
    // Build the query parameter based on status
    const query = status ? `?status=${status}` : "";

    // Fix the URL to match your backend route
    const response = await fetch(
      `http://localhost:8080/api/appointment/appointment-history${query}`,
      {
        method: "GET",
        credentials: "include", // Make sure auth cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch appointment history: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching appointment history:", error);
    return [];
  }
}

export interface AppointmentHistory {
  appointment_id: string;
  therapist: {
    name: string;
    image_url: string;
    location: string;
  };
  price: number;
  appointment_date: string;
  type: string;
  status: string;
  payment_status: string;
}
