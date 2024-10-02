"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { DatePicker } from "@/components/ui/datePicker";
import { fetchJournalEntriesByDate } from "@/app/api/journal";

interface JournalEntry {
  id: string;
  user_id: string;
  content: string;
}
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export default function JournalHistory() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);

  const formatDate = (date: Date | null) => {
    if (!date) return "Invalid date";
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const fetchJournalEntries = async (date: string) => {
    const entries = await fetchJournalEntriesByDate(date);
    setJournalEntries(entries);
  };

  const handleDateChange = (date: Date | undefined) => {
    const selected = date ?? new Date();
    setSelectedDate(selected);
    const formattedDate = selected.toLocaleDateString("en-CA");
    fetchJournalEntries(formattedDate);
  };

  const navigateDate = (direction: "prev" | "next") => {
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setDate(selectedDate.getDate() + (direction === "prev" ? -1 : 1));
      setSelectedDate(newDate);
      const formattedDate = newDate.toLocaleDateString("en-CA");
      fetchJournalEntries(formattedDate);
    }
  };

  useEffect(() => {
    const today = new Date();
    const localDate = new Date(
      today.getTime() - today.getTimezoneOffset() * 60000
    );
    const formattedDate = localDate.toISOString().split("T")[0];
    fetchJournalEntries(formattedDate);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDF5] pt-20 sm:pt-28 flex px-10 sm:px-20">
      <div className="mx-auto w-full flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4 flex flex-col justify-between pb-10 sm:pb-24">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-center sm:text-left">
              Your Journal
            </h1>
            <div className="flex flex-col gap-4">
              <DatePicker onDateChange={handleDateChange} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-4 mt-10">
              <button onClick={() => navigateDate("prev")} className="p-2">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <span className="text-2xl font-bold">
                {selectedDate ? selectedDate.getDate() : "--"}
              </span>
              <button onClick={() => navigateDate("next")} className="p-2">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            <Link
              href="/journal"
              className="block w-full py-2 px-4 bg-yellow-200 text-center rounded-full hover:bg-yellow-300 transition-colors"
            >
              Back to journaling
            </Link>
          </div>
        </div>

        <div className="md:w-3/4 bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
          <div className="p-4 bg-gray-100 text-center text-gray-600">
            {formatDate(selectedDate)}
          </div>
          <div className="flex-grow p-6 relative">
            <div className="absolute inset-0 bg-[linear-gradient(transparent_27px,#EEEEEE_1px)] bg-[size:100%_28px]" />
            <div className="relative z-10 leading-[28px] min-h-[calc(100vh-16rem)]">
              {journalEntries.length > 0 ? (
                journalEntries.map((entry: JournalEntry) => (
                  <div key={entry.id} className="mb-4">
                    <p>{entry.content || "No content available"}</p>
                  </div>
                ))
              ) : (
                <p>No journal entries for this date.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
