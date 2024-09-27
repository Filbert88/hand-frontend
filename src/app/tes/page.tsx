"use client";
import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:8000";

export default function Home() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Create socket instance only once when component mounts
    const socketIo = io(SOCKET_SERVER_URL, {
      transports: ['websocket'],
      autoConnect: true,  // Ensures socket tries to automatically connect
    });

    setSocket(socketIo);  // Store the socket instance in state

    socketIo.on("connect", () => {
      console.log("Connected to server");
    });

    socketIo.on("new_message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Cleanup when component unmounts
    return () => {
      socketIo.disconnect();
    };
  }, []);  // Empty dependency array ensures this runs only once

  const sendMessage = () => {
    if (socket && input.trim()) {
      socket.emit("send_message", input); // Use the socket instance to emit an event
      setInput(""); // Clear input after sending
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col items-center gap-4">
        <ul className="text-center">
          {messages.map((msg, index) => <li key={index}>{msg}</li>)}
        </ul>
        <div className="flex gap-2">
          <input
            className="border p-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button className="p-2 bg-blue-500 text-white" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}
