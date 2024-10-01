"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  CheckCircleIcon,
  XCircleIcon,
  VideoIcon,
  UserIcon,
  AlertCircleIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  fetchAppointmentHistory,
  AppointmentHistory,
} from "../api/appointment";

export default function TransactionHistory() {
  const [filter, setFilter] = useState<string>("all");
  const [transactions, setTransactions] = useState<AppointmentHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAppointmentHistory(
          filter === "all" ? undefined : filter
        );
        setTransactions(data);
        setError("");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to load transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "failure":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircleIcon className="w-5 h-5 mr-1" />;
      case "failure":
        return <XCircleIcon className="w-5 h-5 mr-1" />;
      case "pending":
        return <AlertCircleIcon className="w-5 h-5 mr-1" />;
      default:
        return null;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#FFE9D0] pt-20 px-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Transaction History
        </h1>

        <div className="mb-6">
          <Select onValueChange={(value) => setFilter(value)}>
            <SelectTrigger className="w-full max-w-xs">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {transactions.map((transaction) => (
            <Card
              key={transaction.appointment_id}
              className="bg-white shadow-lg"
            >
              <CardHeader className="bg-[#FFF3E5] border-b border-orange-200">
                <CardTitle className="text-lg font-semibold flex items-center justify-between">
                  <span>Appointment with {transaction.therapist.name}</span>
                  {transaction.type === "online" ? (
                    <VideoIcon className="w-5 h-5 text-blue-500" />
                  ) : (
                    <UserIcon className="w-5 h-5 text-green-500" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center mb-4">
                  <Image
                    src={transaction.therapist.image_url}
                    alt={transaction.therapist.name}
                    width={50}
                    height={50}
                    className="rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-semibold">
                      {transaction.therapist.name}
                    </h3>
                    <Badge className={getStatusColor(transaction.status)}>
                      {getStatusIcon(transaction.status)}
                      {transaction.status.charAt(0).toUpperCase() +
                        transaction.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-2 text-gray-500" />
                    <span>
                      {new Date(
                        transaction.appointment_date
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-2 text-gray-500" />
                    <span>
                      {new Date(
                        transaction.appointment_date
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <MapPinIcon className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{transaction.therapist.location}</span>
                  </div>
                  <div className="font-semibold">
                    Price: Rp {transaction.price.toLocaleString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
