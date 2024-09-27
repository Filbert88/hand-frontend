"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import TherapistCard from "@/components/TherapistCard";
import { DatePicker } from "@/components/ui/datePicker";

function debounce(func: (...args: any) => void, wait: number) {
  let timeout: NodeJS.Timeout;
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default function ConsultationPage() {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<
    "online" | "offline" | null
  >(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [location, setLocation] = useState<string>("");
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchTherapists = async (
    dateStr = "",
    consultationType = "",
    location = ""
  ) => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch(
        `http://localhost:8080/api/therapists?consultation=${consultationType}&location=${location}&date=${dateStr}`
      );
      if (response.ok) {
        const data = await response.json();
        setTherapists(data);
        if (data.length === 0) {
          setErrorMessage("No therapists found for the selected criteria.");
        }
      } else {
        console.error("Error fetching therapists:", response.statusText);
        setErrorMessage("Error fetching therapists.");
      }
    } catch (error) {
      console.error("Error fetching therapists:", error);
      setErrorMessage("Error fetching therapists.");
    }
    setLoading(false);
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    const localISODate = new Date(date.getTime() - timezoneOffset)
      .toISOString()
      .split("T")[0];
    return localISODate;
  };

  useEffect(() => {
    fetchTherapists();
  }, []);

  useEffect(() => {
    const dateStr = formatDate(selectedDate);
    fetchTherapists(dateStr, selectedFilter || "", location);
  }, [selectedDate, selectedFilter, location]);

  const handleFilterClick = (filter: "online" | "offline") => {
    setSelectedFilter(filter);
  };

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date ? date : null);
  };

  const handleLocationChange = useCallback(
    debounce((newLocation: string) => {
      setLocation(newLocation);
    }, 1000),
    []
  );

  const handleChat = () => {
    console.log("Chat button clicked");
  };

  const handleAppointment = () => {
    console.log("Appointment button clicked");
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
                className={`w-28 h-32 cursor-pointer rounded-md p-4 ${
                  selectedFilter === "online"
                    ? "bg-[#FFCB69] border border-black"
                    : ""
                }`}
                onClick={() => handleFilterClick("online")}
              />
              <Image
                src="/offline.png"
                alt="Offline"
                width={100}
                height={100}
                className={`w-28 h-32 cursor-pointer rounded-md p-4 ${
                  selectedFilter === "offline"
                    ? "bg-[#FFCB69] border border-black"
                    : ""
                }`}
                onClick={() => handleFilterClick("offline")}
              />
            </div>

            {/* DatePicker Component */}
            <div className="flex flex-col gap-4">
              <DatePicker onDateChange={handleDateChange} />
            </div>

            {/* Location Input with Debounce */}
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Enter location"
                onChange={(e) => handleLocationChange(e.target.value)} // Using debounced handler
                className="py-2 px-4 bg-[#FFEAD1] rounded-md text-black"
              />
            </div>

            <div className="flex flex-col gap-4">
              <select
                id="sorting"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
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

        {/* Therapist Cards */}
        <div className="w-full lg:w-3/4">
          {loading ? (
            <div>Loading therapists...</div>
          ) : (
            <>
              {errorMessage ? (
                <div>{errorMessage}</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {therapists.map((therapist: any, index: number) => (
                    <TherapistCard
                      key={index}
                      name={therapist.User.name}
                      location={therapist.Location}
                      image={therapist.User.image_url}
                      onChat={handleChat}
                      onAppointment={handleAppointment}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
