"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTherapistSchedule } from "../../app/api/therapist";
import { createAppointment } from "../../app/api/appointment";
import { DatePicker } from "../ui/datePicker";
import { format } from "date-fns"; // To format the date

interface ScheduleProps {
  therapistId: string;
  consultationType: string;
}

export const Schedule: React.FC<ScheduleProps> = ({
  therapistId,
  consultationType,
}) => {
  const [selectedConsultationType, setSelectedConsultationType] =
    useState<string>(
      consultationType === "hybrid" ? "online" : consultationType
    );

  // Set default date to today's date
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const isHybrid = consultationType === "hybrid";

  // Fetch available schedule slots based on selected date and consultation type
  useEffect(() => {
    if (therapistId && selectedDate) {
      fetchSchedule();
    }
  }, [therapistId, selectedDate, selectedConsultationType]);

  const fetchSchedule = async () => {
    try {
      const formattedDate = selectedDate
        ? format(selectedDate, "yyyy-MM-dd")
        : "";
      const schedule = await getTherapistSchedule(
        therapistId,
        formattedDate,
        selectedConsultationType
      );
      const filteredSlots = filterSlotsForToday(schedule?.schedules || []);
      setAvailableSlots(filteredSlots);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  // Filter available time slots if the selected date is today
  const filterSlotsForToday = (slots: string[]) => {
    const today = format(new Date(), "yyyy-MM-dd");
    const selectedDateFormatted = selectedDate
      ? format(selectedDate, "yyyy-MM-dd")
      : "";

    if (selectedDateFormatted !== today) {
      return slots;
    }

    const now = new Date();
    return slots.filter((slot) => {
      const [hours, minutes] = slot.split(":").map(Number);
      const slotDate = new Date();
      slotDate.setHours(hours, minutes, 0);
      return slotDate > now; // Only keep slots after the current time
    });
  };

  const handleSlotSelection = (slot: string) => {
    setSelectedSlot(slot);
  };

  const handleAppointment = async () => {
    if (!selectedSlot || !selectedDate) {
      console.log("Please select a time slot and date.");
      return;
    }

    try {
      const appointmentData = {
        therapistId: therapistId,
        date: new Date(
          `${format(selectedDate, "yyyy-MM-dd")}T${selectedSlot}:00`
        ), // Create DateTime object from date and time slot
        consultationType: selectedConsultationType,
      };

      const response = await createAppointment(appointmentData);
      if (response) {
        console.log("Appointment created successfully", response);
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  return (
    <div className="flex-1 p-4 bg-[#FFF3E5] rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Jadwal Kosong</h2>
      <div className="space-y-4">
        {/* Consultation Type Selector */}
        <div>
          <p className="font-semibold">Tipe Konsultasi</p>
          {!isHybrid ? (
            <p className="text-gray-700 capitalize">
              {selectedConsultationType}
            </p>
          ) : (
            <Select
              value={selectedConsultationType}
              onValueChange={(value) =>
                setSelectedConsultationType(value || "online")
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Online" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Date Picker Component */}
        <p className="font-semibold">Pilih Tanggal:</p>
        <div className="bg-white flex flex-col rounded  w-full">
          <DatePicker onDateChange={setSelectedDate} />{" "}
        </div>

        {/* Available Time Slots */}
        <div className="grid grid-cols-3 gap-2">
          {availableSlots.length > 0 ? (
            availableSlots.map((slot, index) => (
              <Button
                key={index}
                variant={selectedSlot === slot ? "default" : "outline"}
                className="text-sm py-1"
                onClick={() => handleSlotSelection(slot)}
              >
                {slot}
              </Button>
            ))
          ) : (
            <p className="text-gray-500 mb-5">
              Tidak ada jadwal yang tersedia.
            </p>
          )}
        </div>

        {/* Appointment and Chat Actions */}
        <div className="flex gap-2 mt-4">
          <Button className="flex-1" onClick={handleAppointment}>
            Buat Janji
          </Button>
        </div>
      </div>
    </div>
  );
};
