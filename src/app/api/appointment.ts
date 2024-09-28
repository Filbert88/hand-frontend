export async function createAppointment(appointmentData: {
  therapistId: string;
  date: Date;
  consultationType: string;
}) {
  try {
    const response = await fetch(
      "http://localhost:8080/api/appointment/create-appointment",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
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
