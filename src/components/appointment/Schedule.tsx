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
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
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
      const schedule = await getTherapistSchedule(
        therapistId,
        selectedDate,
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
    const today = new Date().toISOString().split("T")[0];
    if (selectedDate !== today) {
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
    if (!selectedSlot) {
      console.log("Please select a time slot.");
      return;
    }

    try {
      const appointmentData = {
        therapistId: therapistId,
        date: new Date(`${selectedDate}T${selectedSlot}:00`), // Create DateTime object from date and time slot
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

  const handleChat = () => {
    console.log("Chat initiated with therapist");
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
        <div className="bg-white rounded p-2">
          <p className="font-semibold">Pilih Tanggal:</p>
          <input
            type="date"
            className="text-gray-500 w-full p-2 bg-white border rounded"
            value={selectedDate}
            min={new Date().toISOString().split("T")[0]} // Disable past dates
            onChange={(e) => setSelectedDate(e.target.value)} // ISO date format from input type="date"
          />
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
            <p className="text-gray-500">Tidak ada jadwal yang tersedia.</p>
          )}
        </div>

        {/* Appointment and Chat Actions */}
        <div className="flex gap-2 mt-4">
          <Button className="flex-1" onClick={handleAppointment}>
            Buat Janji
          </Button>
          <Button variant="outline" className="flex-1" onClick={handleChat}>
            Chat
          </Button>
        </div>
      </div>
    </div>
  );
};
