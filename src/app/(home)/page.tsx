"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link component

const features = [
  { name: "Check In", icon: "/floatingBar/checkin.svg", link: "/check-in" },
  {
    name: "Consultation",
    icon: "/floatingBar/chatAnon.svg",
    link: "/consultation",
  },
  { name: "Journal", icon: "/floatingBar/journal.svg", link: "/journal" },
  {
    name: "Mindfulness",
    icon: "/floatingBar/mindfullness.svg",
    link: "/mindfulness",
  },
  { name: "Your Space", icon: "/floatingBar/profile.svg", link: "/profile" },
  { name: "Library", icon: "/floatingBar/article.svg", link: "/library" },
  {
    name: "Medication",
    icon: "/floatingBar/medication.svg",
    link: "/medication",
  },
  { name: "Emergency", icon: "/floatingBar/emergency.svg", link: "/emergency" },
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#E8F2F3] pt-32 px-10 sm:px-20">
      <div className="grid grid-cols-4 xl:grid-cols-8 gap-8 mb-8 relative z-20">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center">
            <Link href={feature.link}>
              <div className="rounded-full mb-2 flex items-center justify-center cursor-pointer">
                <Image
                  src={feature.icon}
                  alt={`${feature.name} icon`}
                  width={80}
                  height={80}
                />
              </div>
            </Link>
            <span className="text-xs sm:text-sm text-center">{feature.name}</span>
          </div>
        ))}
      </div>

      <div className="relative z-20">
        <div className="bg-white rounded-full py-2 px-4 inline-block mb-4 mt-6 sm:mt-10 z-20">
          <p className="text-lg">Hi, I&apos;m Handy! Wanna talk?</p>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-4 max-w-xl mt-6 sm:mt-10 z-20">
        `&quot;It&apos;s never wrong to ask`&quot;
        </h1>
      </div>

      <div className="absolute bottom-0 right-0 z-10">
        <Image src="/sun.svg" alt="Smiling sun" width={700} height={300} />
      </div>
    </div>
  );
}
