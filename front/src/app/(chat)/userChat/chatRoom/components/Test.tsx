'use client';
import React, { useEffect, useState } from 'react';
const Test = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:5000');
    socket.onopen = () => {
      setWs(socket);
    };
    socket.onmessage = async (event) => {
      console.log(event.data);
      const blob = new Blob([event.data], { type: 'text/plain' });
      const text = await blob.text();
      console.log(text);
      setMessages((prevMessages) => [...prevMessages, text]);
      console.log(messages);
    };
    socket.onclose = () => {
      setWs(null);
    };

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws) {
      ws.send(input);
      setInput('');
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Test;
