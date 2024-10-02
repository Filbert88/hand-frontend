"use client";
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function CarouselComponent({
  items,
}: {
  items: { Title: string; Content: string; image_url: string }[];
}) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const goPrev = () => {
    if (api) {
      api.scrollPrev();
    }
  };

  const goNext = () => {
    if (api) {
      api.scrollNext();
    }
  };

  const handleCardClick = (content: string) => {
    const isYouTubeVideo =
      content.includes("youtube.com") || content.includes("youtu.be");

    if (isYouTubeVideo) {
      let videoId = "";

      if (content.includes("youtube.com")) {
        const urlParams = new URLSearchParams(new URL(content).search);
        videoId = urlParams.get("v") || "";
      } else if (content.includes("youtu.be")) {
        videoId = content.split("youtu.be/")[1];
      }

      if (videoId) {
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        setSelectedVideo(embedUrl);
      } else {
        console.error("Invalid YouTube URL");
      }
    } else {
      window.open(content, "_blank");
    }
  };

  const closePreview = () => setSelectedVideo(null);

  return (
    <section>
      <div className="flex w-full items-center flex-row justify-center">
        <button
          onClick={goPrev}
          className="text-white py-2 px-2 sm:px-4 rounded-full"
        >
          <Image src="/next.svg" alt="next" width={30} height={30} />
        </button>

        <div className="w-full overflow-hidden">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="flex w-full"
          >
            <CarouselContent className="flex">
              {items.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="flex flex-none w-full md:w-1/2 xl:w-1/3 2xl:w-1/4 h-auto justify-center"
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => handleCardClick(item.Content)}
                  >
                    <Card
                      title={item.Title}
                      content={item.Content}
                      imageUrl={item.image_url}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <button
          onClick={goNext}
          className="text-white py-2 px-2 sm:px-4 rounded-full"
        >
          <Image src="/next.svg" alt="next" width={30} height={30} />
        </button>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative w-full max-w-2xl p-10">
            <button
              className="absolute top-0 right-0 text-white p-2 rounded-full"
              onClick={closePreview}
            >
              X
            </button>
            <div className="w-full h-[450px]">
              <iframe
                width="100%"
                height="100%"
                src={selectedVideo}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="YouTube Video"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Card({
  title,
  imageUrl,
}: {
  title: string;
  content: string;
  imageUrl: string;
}) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-52 sm:w-60 md:w-68 lg:w-72 border border-black">
      <div className="relative w-full h-28 mb-4">
        <Image
          src={imageUrl}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-lg"
        />
      </div>
      <div className="bg-[#5B5F73] px-3 py-2">
        <h3 className="text-lg truncate text-white font-gloock">{title}</h3>
      </div>
    </div>
  );
}
