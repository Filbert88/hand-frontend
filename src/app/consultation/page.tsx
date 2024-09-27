"use client";
import React, { useState } from "react";
import Image from "next/image";
import TherapistCard from "@/components/TherapistCard";
import { DatePicker } from "@/components/ui/datePicker"; // Import DatePicker

export default function ConsultationPage() {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"online" | "offline" | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // State to hold the selected date

  const handleFilterClick = (filter: "online" | "offline") => {
    setSelectedFilter(filter);
  };

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleChat = () => {
    console.log("Chat button clicked");
  };

  const handleAppointment = () => {
    console.log("Appointment button clicked");
  };

  // Callback to get date from DatePicker
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    console.log("Selected Date:", date);
  };

  return (
    <div className="bg-[#FFF6EF] min-h-screen px-12 py-6">
      <h1 className="text-black text-2xl mb-6">Hello! We're here!</h1>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-[300px]">
          <div className="flex flex-col gap-4 p-4">
            <div className="flex flex-row gap-12 justify-center">
              <Image
                src="/online.png"
                alt="Online"
                width={300}
                height={300}
                className={`w-28 h-32 cursor-pointer rounded-md p-4 ${selectedFilter === "online" ? "bg-[#FFCB69] border border-black" : ""}`}
                onClick={() => handleFilterClick("online")}
              />
              <Image
                src="/offline.png"
                alt="Offline"
                width={100}
                height={100}
                className={`w-28 h-32 cursor-pointer rounded-md p-4 ${selectedFilter === "offline" ? "bg-[#FFCB69] border border-black" : ""}`}
                onClick={() => handleFilterClick("offline")}
              />
            </div>

            {/* DatePicker Component */}
            <div className="flex flex-col gap-4 w-full">
              <DatePicker />
            </div>

            <div className="flex flex-col gap-4">
              <select
                id="sorting"
                value={selectedOption}
                onChange={handleDropdownChange}
                className="py-2 px-4 bg-[#FFEAD1] rounded-md text-black"
              >
                <option value="">Atur Berdasarkan</option>
                <option value="Harga">Harga</option>
                <option value="Lokasi">Lokasi</option>
                <option value="Jadwal Terdekat">Jadwal Terdekat</option>
                <option value="Rekomendasi">Rekomendasi</option>
              </select>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <TherapistCard
              name="Dr. Abraham"
              location="Bandung"
              image="/therapist.png"
              onChat={handleChat}
              onAppointment={handleAppointment}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
