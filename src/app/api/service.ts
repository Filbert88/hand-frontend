import { ChatMessage } from "../find/[roomId]/page";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export interface CheckInData {
  mood_score: number;
  feelings: string;
  notes: string;
}
export async function getTodayCheckIn() {
  try {
    const response = await fetch(
      `${API_URL}/checkins/ischeckin`,
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
      console.log("Today's CheckIn:", data);
      return data;
    } else {
      throw new Error(data.message || "Error fetching today's check-in");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function createCheckIn(checkInData: CheckInData) {
  try {
    const response = await fetch(`${API_URL}/checkins/create`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        // Assuming the token is stored in localStorage
      },
      body: JSON.stringify(checkInData),
    });
    const data = await response.json();
    if (response.ok) {
      console.log("CheckIn Created:", data);
      return data;
    } else {
      throw new Error(data.message || "Error creating check-in");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function updateCheckIn(checkInData: CheckInData) {
  try {
    const response = await fetch(`${API_URL}/checkins`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkInData),
    });
    const data = await response.json();
    if (response.ok) {
      console.log("CheckIn Updated:", data);
      return data;
    } else {
      throw new Error(data.message || "Error updating check-in");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function fetchChatMessages(roomId: string): Promise<ChatMessage[] | undefined> {
  try {
    const response = await fetch(`${API_URL}/room/message/${roomId}`, {
      method: "GET",
      credentials: "include", // Ensure cookies for session management are included with the request
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      console.log("Chat Messages Fetched:", data);
      return data as ChatMessage[];
    } else {
      throw new Error(data.message || "Error fetching chat messages");
    }
  } catch (error) {
    console.error("Fetch Chat Messages Error:", error);
    return undefined;
  }
}