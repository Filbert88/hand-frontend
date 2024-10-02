"use client";
import React, { useEffect, useState } from "react";
import CarouselComponent from "./Carousel";

interface MediaItem {
  ID: string;
  Type: "article" | "video";
  Title: string;
  Content: string;
  CreatedAt: string;
  UpdatedAt: string;
  image_url: string;
}

export default function Page() {
  const [articles, setArticles] = useState<MediaItem[]>([]);
  const [videos, setVideos] = useState<MediaItem[]>([]);

  useEffect(() => {
    async function fetchMedia() {
      try {
        const response = await fetch(`http://localhost:8080/api/media`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data: MediaItem[] = await response.json();
        const articlesData = data.filter(
          (item: MediaItem) => item.Type === "article"
        );
        const videosData = data.filter(
          (item: MediaItem) => item.Type === "video"
        );
        setArticles(articlesData);
        setVideos(videosData);
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    }

    fetchMedia();
  }, []);

  return (
    <div className="pt-24 sm:pt-28 sm:px-12 px-6 md:px-20">
      <h1 className="text-2xl sm:text-3xl lg:text-6xl font-bold mb-6 text-center font-gloock">
        Let’s explore more about mental health!
      </h1>
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 border rounded-full text-xl text-black shadow-md focus:outline-none font-teachers"
        />
      </div>
      <div className="mt-10">
        <h2 className="text-3xl font-semibold mb-4 font-gloock text-center">
          Articles
        </h2>
        <CarouselComponent items={articles} />
      </div>

      <div className="mt-10 mb-12">
        <h2 className="text-3xl font-semibold mb-4 font-gloock text-center">
          Videos
        </h2>
        <CarouselComponent items={videos} />
      </div>
    </div>
  );
}
