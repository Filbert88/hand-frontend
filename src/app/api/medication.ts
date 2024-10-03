import { getToken } from "@/utils/function";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Medication {
  medName: string;
  stock: number;
  price: number;
  description: string;
  requiresPrescription: boolean;
  image_url: string;
}

export const addMedication = async (
  data: Medication
): Promise<{ success: boolean; message: string }> => {
  const token = await getToken();

  try {
    const formData = new FormData();
    formData.append("name", data.medName);
    formData.append("stock", data.stock.toString());
    formData.append("price", data.price.toString());
    formData.append("description", data.description);
    formData.append(
      "requiresPrescription",
      JSON.stringify(data.requiresPrescription)
    );
    if (data.image_url) {
      formData.append("image", data.image_url);
    }

    const response = await fetch(`${API_URL}/medications/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await response.json();
    if (response.ok) {
      return { success: true, message: "Medication added successfully" };
    } else {
      throw new Error(result.error || "Failed to add medication");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error adding medication:", error.message);
      return { success: false, message: error.message };
    } else {
      console.error("Unknown error:", error);
      return { success: false, message: "An unknown error occurred" };
    }
  }
};
