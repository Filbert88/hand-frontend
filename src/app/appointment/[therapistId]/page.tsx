"use client";

import { useEffect, useState } from "react";
import { getTherapistDetails, Therapist } from "../../api/therapist";
import { TherapistDetails } from "../../../components/appointment/TherapistDetails";
import { Schedule } from "../../../components/appointment/Schedule";
import LoadingBouncer from "@/components/Loading";

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
    return <div><LoadingBouncer /></div>;
  }

  if (!therapistDetails) {
    return <div>Therapist not found</div>;
  }

  return (
    <div className="min-h-screen  px-10 bg-[#FFE9D0] font-teachers">
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
    </div>
  );
};

export default TherapistPage;
