import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTherapistSchedule } from "../../app/api/therapist"; // Assuming this function fetches the schedule from the backend

interface ScheduleProps {
  therapistId: string;
}

export const Schedule: React.FC<ScheduleProps> = ({ therapistId }) => {
  const [consultationType, setConsultationType] = useState<string>("online");
  const [selectedDate, setSelectedDate] = useState<string>(""); // Use a string for ISO date
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Fetch available schedule slots based on selected date and consultation type
  useEffect(() => {
    if (therapistId && selectedDate) {
      fetchSchedule();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [therapistId, selectedDate, consultationType]);

  const fetchSchedule = async () => {
    try {
      const schedule = await getTherapistSchedule(
        therapistId,
        selectedDate,
        consultationType
      );
      setAvailableSlots(schedule?.slots || []);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  const handleSlotSelection = (slot: string) => {
    setSelectedSlot(slot);
  };

  const handleAppointment = () => {
    if (selectedSlot) {
      console.log(`Appointment booked at ${selectedSlot}`);
    } else {
      console.log("Please select a time slot.");
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
          <Select
            onValueChange={(value) => setConsultationType(value || "online")}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Online" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Picker Component */}
        <div className="bg-white rounded p-2">
          <p className="font-semibold">Pilih Tanggal:</p>
          <input
            type="date"
            className="text-gray-500 w-full p-2 bg-white border rounded"
            onChange={(e) => setSelectedDate(e.target.value)} // ISO date format from input type="date"
          />
        </div>

        {/* Available Time Slots */}
        <div className="mt-4">
          <p className="font-semibold">Pilih Waktu:</p>
          <div className="grid grid-cols-3 gap-2">
            {availableSlots.length > 0 ? (
              availableSlots.map((slot, index) => (
                <Button
                  key={index}
                  variant={selectedSlot === slot ? "default" : "outline"} // Use 'default' instead of 'solid'
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
