"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createWebSocket } from "../util/socket";

const SOCKET_SERVER_URL = "ws://localhost:8000/ws"; // Replace with your WebSocket server URL

const Match = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [status, setStatus] = useState<string>(""); // Store status
  const router = useRouter();

  // WebSocket connection and match-checking logic
  useEffect(() => {
    const websocket = createWebSocket(SOCKET_SERVER_URL);

    websocket.onmessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);

      if (message.event === "matched") {
        router.push("/chat"); // If matched, redirect to chat
      } else if (message.event === "in_queue") {
        setStatus("Finding a match..."); // Show finding status
      } else if (message.event === "free") {
        setStatus("Click 'Find Match' to start matching.");
      }
    };

    // Send a message to check current status
    websocket.onopen = () => {
      websocket.send(JSON.stringify({ event: "check_match", data: "" }));
    };

    setWs(websocket);

    return () => {
      if (ws) {
        ws.close(); // Clean up WebSocket connection
      }
    };
  }, []);

  const handleFindMatch = () => {
    if (ws) {
      ws.send(JSON.stringify({ event: "find_match", data: JSON.stringify({ emote: 1 }) })); // Example emote = 1
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Find a Match</h1>
      <p className="text-lg mb-4">{status}</p>
      <button
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
        onClick={handleFindMatch}
      >
        Find Match
      </button>
    </div>
  );
};

export default Match;
