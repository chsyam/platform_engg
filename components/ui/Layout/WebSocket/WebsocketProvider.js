// WebsocketProvider.js
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

export const WebsocketContext = createContext();

export const WebsocketProvider = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [message, setMessage] = useState(null);
  const ws = useRef(null);

  useEffect(() => {

    const ip = process.env.NEXT_PUBLIC_API_TEMPLATE_IP;
    const port = process.env.NEXT_PUBLIC_API_TEMPLATE_PORT;
    const tempUrl = ip + ":" + port;

    const socket = new WebSocket(`ws://${tempUrl}/ws/some_path/`);

    socket.onopen = () => {
      console.log("WebSocket connection opened");
      setIsReady(true);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
      setIsReady(false);
    };

    socket.onmessage = (event) => {
      console.log("WebSocket notification ");
      setMessage(event.data);
    };

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  return (
    <WebsocketContext.Provider value={{ message, isReady }}>
      {children}
    </WebsocketContext.Provider>
  );
};
