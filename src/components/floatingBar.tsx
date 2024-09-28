"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function FloatingBar() {
  const router = useRouter();
  const currentPage = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEmergencyDialogOpen, setIsEmergencyDialogOpen] = useState(false); 

  const icons = [
    { src: "/floatingBar/checkin.svg", page: "/check-in" },
    { src: "/floatingBar/chatAnon.svg", page: "/consultation" },
    { src: "/floatingBar/journal.svg", page: "/journal" },
    { src: "/floatingBar/mindfullness.svg", page: "/mindfullness" },
    { src: "/floatingBar/profile.svg", page: "/profile" },
    { src: "/floatingBar/article.svg", page: "/library" },
    { src: "/floatingBar/medication.svg", page: "/medication" },
    {
      src: "/floatingBar/emergency.svg",
      page: "/emergency",
      emergency: true, 
    },
  ];

  const handleIconClick = (page: string, emergency: boolean = false) => {
    if (emergency) {
      setIsEmergencyDialogOpen(true); 
    } else {
      router.push(page);
      setIsDropdownOpen(false);
    }
  };

  return (
    <>
      <div className="hidden fixed bottom-8 left-0 right-0 sm:flex justify-center z-50">
        <div className="bg-white flex justify-around py-4 shadow-md rounded-full w-11/12 max-w-xl px-4">
          {icons.map((icon, index) => (
            <div
              key={index}
              onClick={() =>
                handleIconClick(icon.page, icon.emergency)
              }
              className={`flex items-center justify-center w-16 h-12 rounded-full cursor-pointer transition-colors duration-300 ${
                currentPage === icon.page ? "bg-gray-200" : ""
              }`}
            >
              <Image
                src={icon.src}
                alt={`Icon ${index + 1}`}
                width={40}
                height={40}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className={`block sm:hidden fixed bottom-10 right-4 z-50 bg-white text-white p-2 rounded-full cursor-pointer transition-all duration-300 ${
          isDropdownOpen ? "rounded-t-none shadow-lg" : "shadow-lg"
        } overflow-hidden`}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="flex items-center justify-center w-10 h-10">
          <Image
            src="/floatingBar/checkin.svg"
            alt="Menu"
            width={40}
            height={40}
          />
        </div>
        {isDropdownOpen && (
          <div className="block sm:hidden fixed bottom-24 right-4 bg-white rounded-t-full py-2">
            {icons.map((icon, index) => (
              <div
                key={index}
                onClick={() =>
                  handleIconClick(icon.page, icon.emergency)
                }
                className="flex items-center justify-center p-2 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <Image
                  src={icon.src}
                  alt={`Icon ${index + 1}`}
                  width={40}
                  height={40}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {isEmergencyDialogOpen && (
        <AlertDialog open={isEmergencyDialogOpen} onOpenChange={setIsEmergencyDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Emergency Call</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to proceed with this emergency call?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsEmergencyDialogOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setIsEmergencyDialogOpen(false);
                  router.push("/emergency");
                }}
              >
                Proceed
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
