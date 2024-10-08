"use client";

import * as React from "react";
import { format, isBefore, isToday } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Define the prop for passing the date back to the parent
interface DatePickerProps {
  onDateChange: (date: Date | undefined) => void;
}

export function DatePicker({ onDateChange }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date()); // Default to today's date

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate); // Update state with the selected date or undefined
    onDateChange(selectedDate); // Call the passed prop to notify parent
    if (selectedDate) {
      console.log("Selected Date:", format(selectedDate, "PPP"));
    }
  };

  // Disable past dates by checking if the date is before today
  const disablePastDates = (day: Date) => {
    return isBefore(day, new Date()) && !isToday(day);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pilih Tanggal</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          disabled={disablePastDates} // Disable past dates
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
