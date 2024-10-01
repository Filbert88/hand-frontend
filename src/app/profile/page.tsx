import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";

interface UserData {
  name: string;
  email: string;
  phone: string;
  isVerified: boolean;
}

const userData: UserData = {
  name: "Lisa",
  email: "lisa@example.com",
  phone: "+1 234 567 8900",
  isVerified: true,
};

const MenuItem: React.FC<{
  icon: string;
  text: string;
  bgColor: string;
  href: string;
}> = ({ icon, text, bgColor, href }) => (
  <Link href={href}>
    <div
      className={`flex items-center space-x-4 p-4 ${bgColor} rounded-lg font-teachers text-black transition-colors cursor-pointer h-20`} 
    >
      <Image
        src={icon}
        alt="icon"
        width={50}
        height={50}
        className="flex-shrink-0"
      />
      <span className="text-xl">{text}</span>
    </div>
  </Link>
);

export default function UserProfile() {
  return (
    <div className="min-h-screen bg-[#F2F8FF] pt-28 sm:pt-32 px-10 sm:px-20">
      <div className="w-full">
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          <div className="flex flex-col w-full lg:w-1/2">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <div>
                <Image
                  src="/therapist.png"
                  alt="Profile picture"
                  width={200}
                  height={200}
                  className="h-60 w-60 rounded-full object-cover bg-white shadow-xl"
                />
              </div>
              <h1 className="mt-4 text-6xl text-gray-900 text-center font-gloock">
                Hai, {userData.name}!
              </h1>
            </div>
            <div className="mt-8">
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col gap-4 w-11/12">
                  <input
                    type="email"
                    value={userData.email}
                    readOnly
                    className="text-xl px-4 py-3 rounded-md text-gray-600 bg-white focus:outline-none focus:ring-0 border border-black"
                  />
                  <input
                    type="text"
                    value={userData.phone}
                    readOnly
                    className="text-xl px-4 py-3 rounded-md text-gray-600 bg-white focus:outline-none focus:ring-0 border border-black"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  {userData.isVerified ? (
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span className="text-md font-medium">Verified</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-2 text-red-600">
                        <XCircle className="h-5 w-5" />
                        <span className="text-md font-medium">
                          Not Verified
                        </span>
                      </div>
                      <Link
                        href="/verify"
                        className="ml-2 px-4 py-2 bg-blue-500 text-white text-md font-medium rounded-md hover:bg-blue-600 transition-colors"
                      >
                        Verify Now
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-grow">
            <div className="grid grid-cols-1 gap-4">
              <MenuItem
                icon="/profile/chatAnon.svg"
                text="Chat Anonymously"
                bgColor="bg-[#91CAF8]"
                href="/find"
              />
              <MenuItem
                icon="/profile/checkin.svg"
                text="Your Mood"
                bgColor="bg-[#C8DDFC]"
                href="/mood"
              />
              <MenuItem
                icon="/floatingBar/journal.svg"
                text="Your Journal"
                bgColor="bg-[#C8F0FC]"
                href="/journal"
              />
              <MenuItem
                icon="/profile/medicalRecord.svg"
                text="Your Medical Record"
                bgColor="bg-[#A4E0F2]"
                href="/medical-record"
              />
              <MenuItem
                icon="/profile/theraphy.svg"
                text="Your Therapy History"
                bgColor="bg-[#DEF1FF]"
                href="/therapy-history"
              />
              <MenuItem
                icon="/profile/mentalHealth.svg"
                text="Your Mental Health Plan"
                bgColor="bg-[#A0C4D8]"
                href="/mental-health-plan"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
