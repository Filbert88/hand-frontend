import React from "react";
import Image from "next/image";

const exercises = [
  {
    color: "#DBE7CE",
    icon: "/mindfullness/meditation.svg",
    title: "Meditation",
  },
  {
    color: "#D4F0C8",
    icon: "/mindfullness/mindful.svg",
    title: "Mindful Breathing",
  },
  {
    color: "#A7DFB9",
    icon: "/mindfullness/visualization.svg",
    title: "Visualization",
  },
  {
    color: "#E6FFF1",
    icon: "/mindfullness/bodyScan.svg",
    title: "Body Scan",
  },
  {
    color: "#B5D2B8",
    icon: "/mindfullness/movement.svg",
    title: "Mindful Movement",
  },
  {
    color: "#D9FFDB",
    icon: "/mindfullness/sensory.svg",
    title: "Sensory Exercises",
  },
];

export default function Page() {
  return (
    <div className="px-10 bg-[#F7FFF2] min-h-screen">
      <h1 className="font-gloock text-6xl text-center pt-28 mb-10">
        Let&#39;s exercise on our mindfulness
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {exercises.map((exercise, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-between p-4 rounded-md shadow-xl h-full"
            style={{ backgroundColor: exercise.color }}
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
            <p className="text-center mt-4 font-teachers text-2xl">{exercise.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
