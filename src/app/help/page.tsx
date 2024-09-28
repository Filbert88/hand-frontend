"use client";
import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Page() {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([
    {
      title: "Is it accessible?",
      content: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      title: "Is it styled?",
      content:
        "Yes. It comes with default styles that match the other components' aesthetic.",
    },
    {
      title: "Is it animated?",
      content:
        "Yes. It's animated by default, but you can disable it if you prefer.",
    },
  ]);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, data]);

  const handleSearchClick = () => {
    if (inputValue.trim() === "") {
      setSearchTerm("");
    } else {
      setSearchTerm(inputValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value.trim() === "") {
      setSearchTerm("");
    }
  };

  return (
    <div className="px-10 sm:px-20 pt-10 flex flex-col bg-[#E8F2F3] min-h-screen">
      <h1 className="text-center text-3xl">Let Us Help You!</h1>
      <div className="relative mt-4">
        <input
          className="px-4 py-3 w-full bg-white rounded-xl focus:outline-none sm:text-base text-sm"
          placeholder="What trouble do you have?"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          onClick={handleSearchClick}
          className="absolute right-4 top-1/2 transform -translate-y-1/2"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </div>
      <div className="mt-6">
        <Accordion type="single" collapsible className="w-full">
          {filteredData.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
