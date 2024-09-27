"use client";
import React, { useEffect, useState } from "react";

const SOCKET_SERVER_URL = "ws://localhost:8000/ws";

// Define the props and states with appropriate types
export default function Home() {
  // Proper typing for WebSocket, initialized to null but asserted as WebSocket later in the code
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]); // Messages array is typed as an array of strings
  const [input, setInput] = useState<string>(""); // State to manage the input field

  useEffect(() => {
    const websocket = new WebSocket(SOCKET_SERVER_URL);

    websocket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    websocket.onmessage = (event: MessageEvent) => {
      setMessages(prevMessages => [...prevMessages, event.data]);
    };

    websocket.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    websocket.onerror = (error: Event) => {
      console.log("WebSocket error: ", error);
    };

    setWs(websocket);

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      if (websocket) {
        websocket.close();
      }
    };
  }, []);

  // Function to send a message to the WebSocket server
  const sendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN && input.trim()) {
      
      ws.send(input); // Send the input message through the WebSocket
      setInput("");   // Clear the input field after sending the message
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-white text-3xl">Nice Guys</h1>
      <ul>
        {messages.map((msg, index) => <li key={index}>{msg}</li>)}
      </ul>
      <div className="flex gap-4">
        <input 
          className="border p-2 text-black"
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)} // Update input state when typing
          placeholder="Type a message..."
        />
        <button 
          className="p-2 bg-blue-500 text-white" 
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
