import { Medication } from "../medication/page";
import { getToken } from "@/utils/function";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface MedicationHistoryItem {
  id: string;
  transactionId: string;
  medicationId: string;
  name: string;
  quantity: number;
  price_per_item: number;
  createdAt: string;
}

export interface MedicationHistory {
  id: string;
  user_id: string;
  total_price: number;
  payment_status: string;
  transaction_date: string;
  items: MedicationHistoryItem[];
  created_at: string;
  updated_at: string;
}

export interface CheckoutMedicationRequest {
  allItem: Array<{
    medicationId: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  totalPrice: number;
}

// Fetch all medications
export async function getAllMedications(): Promise<Medication[]> {
  const token = await getToken();
  try {
    const response = await fetch(`${API_URL}/medications`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include", // Include credentials if needed
    });

    if (!response.ok) {
      throw new Error(`Error fetching medications: ${response.statusText}`);
    }

    const data: Medication[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching all medications", error);
    throw error;
  }
}

// Fetch medications by name
export async function getMedicationsByName(
  name: string
): Promise<Medication[]> {
  const token = await getToken();
  try {
    const response = await fetch(
      `${API_URL}/medications?name=${encodeURIComponent(name)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Error fetching medications by name: ${response.statusText}`
      );
    }

    const data: Medication[] = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching medications by name "${name}"`, error);
    throw error;
  }
}

interface History {
  history: MedicationHistory[];
}

export async function getMedicationHistoryByUserID(
  userId: string
): Promise<History> {
  const token = await getToken();
  try {
    const response = await fetch(`${API_URL}/medication/history/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Assuming token is stored in localStorage
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching medication history: ${response.statusText}`
      );
    }

    const data: History = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching medication history", error);
    throw error;
  }
}

// Post new medication transaction
export async function postMedicationTransaction(
  requestData: CheckoutMedicationRequest
): Promise<{ message: string; payment_url?: string }> {
  const token = await getToken();
  try {
    const response = await fetch(`${API_URL}/medication/transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Assuming token is stored in localStorage
      },
      credentials: "include",
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(
        `Error posting medication transaction: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error posting medication transaction", error);
    throw error;
  }
}
