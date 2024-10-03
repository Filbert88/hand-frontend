"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import TherapistCard from "@/components/TherapistCard";
import { DatePicker } from "@/components/ui/datePicker";
import { useRouter } from "next/navigation";
import { fetchTherapists } from "../api/consultation";
import LoadingBouncer from "@/components/Loading";
import Link from "next/link";
function debounce<T extends (...args: Parameters<T>) => void>(
  func: T,
  wait: number
) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

interface User {
  email: string;
  image_url: string;
  is_mobile_verified: boolean;
  name: string;
  password: string;
  phone_number: string;
  role: string;
}

interface Therapist {
  ID: string;
  AppointmentRate: number;
  Consultation: string;
  CreatedAt: string;
  Location: string;
  Specialization: string;
  UpdatedAt: string;
  UserID: string;
  User: User;
}

export default function ConsultationPage() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<
    "online" | "offline" | null
  >(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [location, setLocation] = useState<string>("");
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  console.log(therapists, "ini data terapis");

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    const localISODate = new Date(date.getTime() - timezoneOffset)
      .toISOString()
      .split("T")[0];
    return localISODate;
  };

  useEffect(() => {
    const loadTherapists = async () => {
      setLoading(true);
      const dateStr = formatDate(selectedDate);

      const { therapists, errorMessage } = await fetchTherapists(
        dateStr,
        "",
        location
      );
      setTherapists(therapists);
      setErrorMessage(errorMessage);
      setLoading(false);
    };

    loadTherapists();
  }, [selectedDate, location]);

  const getFilteredTherapists = () => {
    return therapists.filter((therapist) => {
      if (selectedFilter === "online") {
        return (
          therapist.Consultation === "online" ||
          therapist.Consultation === "hybrid"
        );
      } else if (selectedFilter === "offline") {
        return (
          therapist.Consultation === "offline" ||
          therapist.Consultation === "hybrid"
        );
      }
      return true;
    });
  };

  useEffect(() => {
    const dateStr = formatDate(selectedDate);
    fetchTherapists(dateStr, selectedFilter || "", location);
  }, [selectedDate, selectedFilter, location]);

  const handleFilterClick = (filter: "online" | "offline") => {
    if (selectedFilter === filter) {
      setSelectedFilter(null);
    } else {
      setSelectedFilter(filter);
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date ? date : null);
  };

  const handleLocationChange = useCallback(
    debounce((newLocation: string) => {
      setLocation(newLocation.trim());
    }, 1000),
    []
  );

  const handleChat = () => {
    console.log("Chat button clicked");
  };

  const handleAppointment = (therapistId: string) => {
    router.push(`/appointment/${therapistId}`);
  };

  if (loading) {
    return <LoadingBouncer />;
  }

  return (
    <div className="bg-[#FFF6EF] min-h-screen px-12 py-6 pt-28">
      <h1 className="text-black text-4xl mb-6 font-gloock">
        Hello! We&apos;re here!
      </h1>

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
            <div className="flex flex-col gap-4 font-teachers">
              <DatePicker onDateChange={handleDateChange} />
            </div>


            <div className="flex flex-col gap-4 font-teachers">
              <input
                type="text"
                placeholder="Enter location"
                onChange={(e) => handleLocationChange(e.target.value)} 
                className="py-2 px-4 bg-[#FFEAD1] rounded-md text-black"
              />
            </div>
            <Link href="/appointment-history">
              <button className="px-4 py-3 rounded-xl font-teachers text-xl bg-[#CC8005] text-white">
                Your Appointments
              </button>
            </Link>
          </div>
        </div>

        {/* Therapist Cards */}
        <div className="w-full lg:w-3/4">
          {loading ? (
            <div>
              <LoadingBouncer />
            </div>
          ) : (
            <>
              {errorMessage ? (
                <div>{errorMessage}</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 font-teachers">
                  {getFilteredTherapists().map(
                    (therapist: Therapist, index: number) => (
                      <TherapistCard
                        key={index}
                        name={therapist.User.name}
                        location={therapist.Location}
                        image={therapist.User.image_url}
                        onChat={handleChat}
                        onAppointment={() =>
                          handleAppointment(therapist.UserID)
                        } // Pass the therapistId to the function
                      />
                    )
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
