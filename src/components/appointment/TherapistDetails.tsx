import Image from "next/image";
import { MapPin, Phone, CreditCard, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface TherapistDetailsProps {
  therapist: {
    name: string;
    location: string;
    image_url: string;
    appointment_rate: number;
    consultation_type: string;
    phone_number: string;
    specialization: string;
  };
}

export const TherapistDetails: React.FC<TherapistDetailsProps> = ({
  therapist,
}) => {
  return (
    <Card className="bg-[#FFF3E5] shadow-lg w-full h-full">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-shrink-0 w-full lg:w-1/3">
            <Image
              src={therapist.image_url}
              alt={`${therapist.name}'s profile photo`}
              width={300}
              height={300}
              className="rounded-lg object-cover w-full h-auto"
            />
          </div>
          <div className="flex flex-col justify-between w-full lg:w-2/3">
            <div>
              <h2 className="text-3xl font-bold mb-4">{therapist.name}</h2>
              <div className="space-y-3 text-lg">
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-gray-500" />
                  <span>{therapist.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-gray-500" />
                  <span>Rp {therapist.appointment_rate.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-6 h-6 text-gray-500" />
                  <span>{therapist.consultation_type}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-6 h-6 text-gray-500" />
                  <span>{therapist.phone_number}</span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3">Spesialisasi</h3>
              <div className="flex flex-wrap gap-2">
                {therapist.specialization.split(", ").map((spec, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-white text-gray-800 text-sm py-1 px-3"
                  >
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
