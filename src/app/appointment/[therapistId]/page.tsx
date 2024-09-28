"use client";

import { useEffect, useState } from "react";
import { getTherapistDetails, Therapist } from "../../api/therapist";
import { TherapistDetails } from "../../../components/appointment/TherapistDetails";
import { Schedule } from "../../../components/appointment/Schedule";

interface TherapistPageProps {
  params: {
    therapistId: string;
  };
}

const TherapistPage: React.FC<TherapistPageProps> = ({ params }) => {
  const { therapistId } = params;
  const [therapistDetails, setTherapistDetails] = useState<Therapist | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (therapistId) {
      fetchTherapistData(therapistId);
    }
  }, [therapistId]);

  const fetchTherapistData = async (id: string) => {
    setLoading(true);
    try {
      const details = await getTherapistDetails(id);
      setTherapistDetails(details);
    } catch (error) {
      console.error("Error fetching therapist details", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!therapistDetails) {
    return <div>Therapist not found</div>;
  }

  return (
    <div className="min-h-screen pt-20 px-10 bg-[#FFE9D0] p-4">
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
        <div className="flex-1 flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <TherapistDetails therapist={therapistDetails} />
          </div>
          <div className="w-full md:w-1/2">
            <Schedule
              consultationType={therapistDetails.consultation_type}
              therapistId={therapistId}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TherapistPage;
