import { getToken } from "@/utils/function";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchMedia() {
  const token = await getToken();
  try {
    const response = await fetch(`${API_URL}/media`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data: MediaItem[] = await response.json();

    if (response.ok) {
      const articlesData = data.filter(
        (item: MediaItem) => item.Type === "article"
      );
      const videosData = data.filter(
        (item: MediaItem) => item.Type === "video"
      );

      return { articles: articlesData, videos: videosData };
    } else {
      throw new Error("Error fetching media");
    }
  } catch (error) {
    console.error("Error fetching media:", error);
    return { articles: [], videos: [] };
  }
}

interface MediaItem {
  ID: string;
  Type: "article" | "video";
  Title: string;
  Content: string;
  CreatedAt: string;
  UpdatedAt: string;
  image_url: string;
}
