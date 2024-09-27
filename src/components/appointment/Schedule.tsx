import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Schedule: React.FC = () => {
  return (
    <div className="flex-1 p-4 bg-[#FFF3E5] rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Jadwal Kosong</h2>
      <div className="space-y-4">
        {/* Select Online/Offline */}
        <div>
          <p className="font-semibold">Tipe Konsultasi</p>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Online" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Picker Placeholder */}
        <div className="bg-white rounded p-2">
          <p className="font-semibold">Pilih Tanggal:</p>
          <p className="text-gray-500">[Date Picker Placeholder]</p>
        </div>

        {/* Available Time Slots */}
        <div className="mt-4">
          <p className="font-semibold">Pilih Waktu:</p>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 18 }, (_, i) => (
              <Button key={i} variant="outline" className="text-sm py-1">
                {`07:00 - ${8 + (i % 3)}:00`}
              </Button>
            ))}
          </div>
        </div>

        {/* Appointment Actions */}
        <div className="flex gap-2 mt-4">
          <Button className="flex-1">Buat Janji</Button>
          <Button variant="outline" className="flex-1">
            Chat
          </Button>
        </div>
      </div>
    </div>
  );
};
