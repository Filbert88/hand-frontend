"use client";
import React, { useEffect, useState } from "react";
import { createWebSocket } from "../util/socket";
import { getCookie } from 'cookies-next';
interface ChatMessage {
    ID: string;
    SenderID: string;
    ChatRoomID: string;
    MessageContent: string;
    SentAt: string;
  }
const SOCKET_SERVER_URL = "ws://localhost:8000/ws"; // Replace with your WebSocket server URL

const Chat = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>("");
  const [currentUserId, setCurrentUserId] = useState<string | undefined>();// Assuming you store userId in cookies upon login
  // WebSocket connection logic
  useEffect(() => {
    setCurrentUserId(getCookie('userId') as string);
    console.log(getCookie('userId') as string)
    const websocket = createWebSocket(SOCKET_SERVER_URL);

    websocket.onmessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);

      if (message.event === "message") {
        console.log(message.data)
        setMessages((prevMessages) => [...prevMessages, message.data as ChatMessage]);
      }

    };

    setWs(websocket);

    return () => {
      if (ws) {
        ws.close(); // Clean up WebSocket connection
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (ws && input.trim()) {
      ws.send(JSON.stringify({ event: "send_message", data: input }));
      setInput(""); // Clear the input after sending
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Chat</h1>
        <div className="mb-4">
          <ul className="space-y-2">
            {messages.map((msg, index) => (
              <li key={index} className={`text-gray-700 w-full ${msg.SenderID === currentUserId ? 'text-right' : 'text-left'}`}>
                {msg.MessageContent} <small>({new Date(msg.SentAt).toLocaleTimeString()})</small>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex space-x-2">
          <input
            className="flex-1 px-4 py-2 border rounded-lg"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
