"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function JournalPage() {
  const [journalEntry, setJournalEntry] = useState("");

  const handleSave = async () => {
    const today = new Date().toISOString().split("T")[0];

    try {
      const response = await fetch("http://localhost:8080/api/journals", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: journalEntry,
        }),
      });

      if (response.ok) {
        console.log("Journal entry saved successfully");
        setJournalEntry("");
      } else {
        console.error("Failed to save journal entry");
      }
    } catch (error) {
      console.error("Error saving journal entry:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFF2] pt-28 px-10">
      <div className="mx-auto bg-[#FFFDF5] rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row h-[calc(100vh-8rem)]">
          <div className="md:w-1/3 flex flex-col justify-between">
            <h2 className="text-5xl font-bold mb-8 font-gloock sm:text-left text-center">
              So.., what's up?
            </h2>
            <div className="flex flex-col pb-10 sm:pb-28 justify-center">
              <Link
                href="/journal/history"
                className="flex items-center transition-colors justify-center"
              >
                <div className="mr-4 flex items-center justify-center">
                  <Image
                    src="/see_journal.svg"
                    alt="see_journal"
                    width={100}
                    height={60}
                  />
                </div>
                <span className="text-lg font-semibold font-gloock text-black ">
                  See your day to
                  <br />
                  day journal!!
                </span>
              </Link>
              <button
                onClick={handleSave}
                className="mt-4 px-6 py-2 bg-[#F6F68E] text-black rounded-xl transition-colors flex items-center mx-auto"
              >
                Save Writing
              </button>
            </div>
          </div>

          <div className="min-h-80 w-full md:w-2/3 bg-white p-6 relative border border-r-2 border-r-[#C1C1BE] border-l-2 border-l-[#C1C1BE]">
            <div className="absolute inset-0 bg-[linear-gradient(transparent_27px,#EEEEEE_1px)] bg-[size:100%_28px] pointer-events-none" />
            <textarea
              className="w-full h-full p-0 bg-transparent resize-none border-none outline-none leading-[28px] relative z-10"
              style={{ lineHeight: "28px" }}
              placeholder="Start writing here..."
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
