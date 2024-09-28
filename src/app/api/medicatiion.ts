import { Medication } from "../medication/page";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Fetch all medications
export async function getAllMedications(): Promise<Medication[]> {
  try {
    const response = await fetch(`${API_URL}/medications`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include credentials if needed
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
export async function getMedicationsByName(name: string): Promise<Medication[]> {
  try {
    const response = await fetch(`${API_URL}/medications?name=${encodeURIComponent(name)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Error fetching medications by name: ${response.statusText}`);
    }

    const data: Medication[] = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching medications by name "${name}"`, error);
    throw error;
  }
}