"use client";
import React, { useState } from "react";
import Image from "next/image";

const exercises = [
  {
    color: "#DBE7CE",
    icon: "/mindfullness/meditation.svg",
    title: "Meditation",
    videoId: "ZToicYcHIOU",
  },
  {
    color: "#D4F0C8",
    icon: "/mindfullness/mindful.svg",
    title: "Mindful Breathing",
    videoId: "ZToicYcHIOU",
  },
  {
    color: "#A7DFB9",
    icon: "/mindfullness/visualization.svg",
    title: "Visualization",
    videoId: "ZToicYcHIOU",
  },
  {
    color: "#E6FFF1",
    icon: "/mindfullness/bodyScan.svg",
    title: "Body Scan",
    videoId: "ZToicYcHIOU",
  },
  {
    color: "#B5D2B8",
    icon: "/mindfullness/movement.svg",
    title: "Mindful Movement",
    videoId: "ZToicYcHIOU",
  },
  {
    color: "#D9FFDB",
    icon: "/mindfullness/sensory.svg",
    title: "Sensory Exercises",
    videoId: "ZToicYcHIOU",
  },
];

export default function Page() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleClick = (videoId: string) => {
    setSelectedVideo(videoId);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="px-10 bg-[#F7FFF2] min-h-screen">
      <h1 className="font-gloock text-4xl md:text-6xl text-center pt-28 mb-10">
        Let&#39;s exercise on our mindfulness
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {exercises.map((exercise, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-between p-4 rounded-md shadow-xl h-full cursor-pointer"
            style={{ backgroundColor: exercise.color }}
            onClick={() => handleClick(exercise.videoId)}
          >
            <div className="flex-1 flex items-center justify-center">
              <Image
                src={exercise.icon}
                height={80}
                width={130}
                alt={exercise.title}
                className="object-contain"
              />
            </div>
            <p className="text-center mt-4 font-teachers text-2xl">
              {exercise.title}
            </p>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-3xl w-11/12"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute -top-10 -right-2 text-white p-10 rounded-full px-2 py-1"
              >
                ✕
              </button>
              <iframe
                width="100%"
                height="400px"
                src={`https://www.youtube.com/embed/${selectedVideo}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
      <div className="h-32"></div>
    </div>
  );
}
