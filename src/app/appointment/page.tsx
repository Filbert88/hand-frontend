import { TherapistDetails } from "../../components/appointment/TherapistDetails";
import { Schedule } from "../../components/appointment/Schedule";

const TherapistPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FFE9D0] p-4">
      <main className="flex gap-4">
        <aside className="w-64 space-y-2">
          <div className="bg-gray-200 text-gray-700 p-4 rounded-lg">
            Pick Your Therapist
          </div>
          <div className="bg-orange-500 text-white p-4 rounded-lg">
            Details & Appointment
          </div>
          <div className="bg-gray-200 text-gray-700 p-4 rounded-lg">
            Chat the Therapist
          </div>
        </aside>
        <div className="flex-1 flex gap-4">
          {/* <div className="flex-1 bg-[#FFF3E5] rounded-xl p-6 shadow-md"> */}
          <TherapistDetails />
          {/* </div> */}
          {/* <div className="flex-1 bg-[#FFF3E5] rounded-xl p-6 shadow-md"> */}
          <Schedule />
          {/* </div> */}
        </div>
      </main>
    </div>
  );
};

export default TherapistPage;
