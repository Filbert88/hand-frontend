"use client";
import React, { useState, useEffect } from "react";
import { fetchConsultations } from "../api/consultation";
import { getCookie } from "cookies-next";

type Prescription = {
  id: string;
  medication: {
    id: string;
    name: string;
  };
  dosage: string;
  quantity: string;
};

type Consultation = {
  id: string;
  appointment_id: string;
  conclusion: string;
  consultation_date: string;
  doctor: {
    name: string;
  };
  prescriptions: Prescription[];
};

export default function Page() {
  const userId = getCookie("user_id");
  const [selectedRecord, setSelectedRecord] = useState<Consultation | null>(null);
  const [consultations, setConsultations] = useState<Consultation[]>([]);

  useEffect(() => {
    const loadConsultations = async () => {
      if (userId) {
        const consultations = await fetchConsultations(userId);
        setConsultations(consultations);
      }
    };

    loadConsultations();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-100 pt-28 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Medical Records</h1>

        <ul className="space-y-4">
          {consultations.map((record) => (
            <li
              key={record.id}
              className="bg-white rounded-lg p-4 shadow cursor-pointer hover:bg-gray-50"
              onClick={() => setSelectedRecord(record)}
            >
              <p className="font-semibold">
                Consultation on{" "}
                {new Date(record.consultation_date).toLocaleDateString()}
              </p>
              <p className="text-gray-600">by {record.doctor.name}</p>
            </li>
          ))}
        </ul>

        {selectedRecord && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-sky-100 rounded-lg p-6 w-full max-w-2xl relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedRecord(null)}
              >
                Close
              </button>

              <h2 className="text-2xl font-bold mb-4">Your Medical Records</h2>

              <div className="bg-gray-200 rounded-full px-4 py-2 inline-block mb-2">
                Prescripted at{" "}
                {new Date(selectedRecord.consultation_date).toLocaleDateString()}
              </div>
              <div className="bg-gray-200 rounded-full px-4 py-2 inline-block mb-4 ml-0 sm:ml-2">
                {selectedRecord.doctor.name}
              </div>

              <div className="bg-white rounded-lg p-4 mb-4">
                <h3 className="text-xl font-semibold mb-2">
                  Consultation Result
                </h3>
                <p className="text-gray-600">{selectedRecord.conclusion}</p>
              </div>

              <div className="bg-sky-200 rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2">Medicines</h3>
                {selectedRecord.prescriptions.length > 0 ? (
                  <ul className="space-y-2">
                    {selectedRecord.prescriptions.map((prescription, index) => (
                      <li key={index} className="bg-white rounded-lg p-2">
                        {prescription.medication.name} - {prescription.dosage} - Quantity: {prescription.quantity}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">No prescriptions available</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
