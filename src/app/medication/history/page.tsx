"use client";

import React, { useState, useEffect } from "react";
import { Calendar, CreditCard, Package } from "lucide-react";
import {
  getMedicationHistoryByUserID,
  MedicationHistory,
} from "@/app/api/medicationService"; // Import the service
import { getCookie } from "cookies-next";

const PurchaseHistory: React.FC = () => {
  const [transactions, setTransactions] = useState<MedicationHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userId = getCookie("user_id"); 
    if (userId) {
      getMedicationHistoryByUserID(userId)
        .then((data) => {
          setTransactions(data.history);
          console.log(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch transactions:", error);
          setIsLoading(false);
        });
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="min-h-screen bg-[#FFF2F7] font-teachers py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl sm:text-5xl font-gloock md:text-6xl font-bold mb-8 text-gray-800">
          Purchase History
        </h1>
        <div className="space-y-8">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <div className="bg-gradient-to-r from-pink-100 to-pink-200 px-6 py-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-800">
                      Transaction {transaction.id}
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        transaction.payment_status === "success"
                          ? "bg-green-100 text-green-800"
                          : transaction.payment_status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.payment_status.charAt(0).toUpperCase() +
                        transaction.payment_status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <div className="flex flex-wrap justify-between items-center mb-4">
                    <div className="flex items-center text-gray-600 mb-2 sm:mb-0">
                      <Calendar className="h-5 w-5 mr-2" />
                      <span>{transaction.transaction_date}</span>
                    </div>
                    <div className="flex items-center text-gray-800">
                      <CreditCard className="h-5 w-5 mr-2" />
                      <span className="font-bold text-lg tracking-wider">
                        Total: Rp{transaction.total_price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="border-t border-pink-100 pt-4">
                    <h3 className="font-semibold mb-2 text-gray-700 flex items-center">
                      <Package className="h-5 w-5 mr-2" />
                      Items:
                    </h3>
                    <ul className="space-y-2">
                      {transaction.items.map((item, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center bg-pink-50 rounded-lg p-2"
                        >
                          <span className="text-gray-800 tracking-widest">
                            {item.name}{" "}
                            <span className="text-pink-600 font-medium">
                              (x{item.quantity})
                            </span>
                          </span>
                          <span className="text-gray-600 tracking-widest">
                            Rp{item.price_per_item.toLocaleString()}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No transactions found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;
