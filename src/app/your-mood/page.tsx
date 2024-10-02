"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image"; // Import Next.js Image component
import { getCheckIn } from "../api/service"; // Fetch function to get check-in data

const emotions = [
  { emoji: "/checkIn/emoji1 (9).png", id: 10 },
  { emoji: "/checkIn/emoji1 (10).png", id: 1 },
  { emoji: "/checkIn/emoji1 (1).png", id: 2 },
  { emoji: "/checkIn/emoji1 (2).png", id: 3 },
  { emoji: "/checkIn/emoji1 (3).png", id: 4 },
  { emoji: "/checkIn/emoji1 (4).png", id: 5 },
  { emoji: "/checkIn/emoji1 (5).png", id: 6 },
  { emoji: "/checkIn/emoji1 (6).png", id: 7 },
  { emoji: "/checkIn/emoji1 (7).png", id: 8 },
  { emoji: "/checkIn/emoji1 (8).png", id: 9 },
];

export default function MoodCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [moodData, setMoodData] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        const checkIns = await getCheckIn();
        console.log("data ", checkIns);

        const newMoodData: Record<string, string> = {};

        console.log("Type of checkIns:", typeof checkIns);
        console.log("Is Array:", Array.isArray(checkIns));

        if (Array.isArray(checkIns)) {
          checkIns.map(
            (checkIn: { mood_score: number; check_in_date: string }) => {
              const utcDate = new Date(checkIn.check_in_date);
              const localDate = new Date(utcDate.getTime() + 7 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0];

              const emotion =
                emotions.find((e) => e.id === checkIn.mood_score)?.emoji || "";
              newMoodData[localDate] = emotion;
            }
          );
        }

        setMoodData(newMoodData);
      } catch (error) {
        console.error("Failed to fetch mood data", error);
      }
    };

    fetchMoodData();
  }, [currentDate]);

  console.log(moodData);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const renderCalendar = () => {
    const calendar = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          week.push(
            <td key={`empty-${j}`} className="p-2 border text-center"></td>
          );
        } else if (day > daysInMonth) {
          break;
        } else {
          const date = `${currentDate.getFullYear()}-${String(
            currentDate.getMonth() + 1
          ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const mood = moodData[date] || "";

          week.push(
            <td
              key={day}
              className={`p-2 border text-center ${
                isToday(day) ? "bg-blue-100" : ""
              }`}
            >
              <div className="flex flex-col items-center justify-between h-16">
                <span className={`text-sm ${isToday(day) ? "font-bold" : ""}`}>
                  {day}
                </span>
                {mood && (
                  <Image
                    src={mood}
                    alt="Mood"
                    width={32}
                    height={32}
                    className="mt-2"
                  />
                )}
              </div>
            </td>
          );
          day++;
        }
      }
      calendar.push(<tr key={i}>{week}</tr>);
      if (day > daysInMonth) break;
    }

    return calendar;
  };

  return (
    <div className="p-4 max-w-4xl mx-auto pt-28">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={prevMonth} variant="outline" size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <Button onClick={nextMonth} variant="outline" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <Select
        onValueChange={(value) =>
          setCurrentDate(
            new Date(currentDate.getFullYear(), parseInt(value), 1)
          )
        }
        value={currentDate.getMonth().toString()}
      >
        <SelectTrigger className="w-[180px] mb-4">
          <SelectValue placeholder="Select month" />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 12 }, (_, i) => (
            <SelectItem key={i} value={i.toString()}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <th key={day} className="p-2 border font-semibold">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{renderCalendar()}</tbody>
      </table>
    </div>
  );
}
