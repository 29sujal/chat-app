import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import EmojiPicker from "emoji-picker-react";

const socket = io("http://localhost:3001"); // Adjust for production

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [joined, setJoined] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      return storedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [showPicker, setShowPicker] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleMessage = (data) => {
      setChat((prev) => [...prev, data]);
    };

    socket.on("receive_message", handleMessage);
    return () => {
      socket.off("receive_message", handleMessage);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const joinRoom = () => {
    if (room) {
      socket.emit("join_room", room);
      setJoined(true);
    }
  };

  const sendMessage = () => {
    if (!username || !message || !room) return;
    socket.emit("send_message", {
      room,
      username,
      message,
    });
    setMessage("");
  };

  const onEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
    setShowPicker(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <div className="flex justify-end p-2">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-3 py-1 rounded"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-xl p-6 bg-white dark:bg-gray-800 text-black dark:text-white rounded shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">💬 Real-Time Chat</h1>

          {!joined ? (
            <div className="space-y-4">
              <input
                className="w-full p-2 border rounded"
                placeholder="Enter Room ID"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
              />
              <button
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
                onClick={joinRoom}
              >
                Join Room
              </button>
            </div>
          ) : (
            <>
              <input
                className="w-full p-2 border rounded mb-4"
                placeholder="Your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <div className="h-64 overflow-y-auto mb-4 border rounded p-4 bg-gray-50 dark:bg-gray-700 space-y-2">
                {chat.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.username === username ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] px-3 py-2 rounded-lg ${
                        msg.username === username
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 dark:bg-gray-600 dark:text-white text-black"
                      }`}
                    >
                      <div className="text-sm font-semibold">{msg.username}</div>
                      <div>{msg.message}</div>
                      <div className="text-xs mt-1 text-right text-gray-200">
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <input
                    className="flex-1 p-2 border rounded"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button
                    onClick={() => setShowPicker((prev) => !prev)}
                    className="text-2xl"
                  >
                    😊
                  </button>
                  <button
                    onClick={sendMessage}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded"
                  >
                    Send
                  </button>
                </div>
                {showPicker && (
                  <div className="relative z-10">
                    <EmojiPicker
                      onEmojiClick={onEmojiClick}
                      theme={darkMode ? "dark" : "light"}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

