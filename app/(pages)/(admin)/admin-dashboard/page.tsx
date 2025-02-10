"use client";
import React from 'react'

import { useEffect, useState } from "react";
import { useSocket } from "../../../hooks/useSocket";

const AdminDashboard = () => {
    const { socket, isConnected } = useSocket();
    const [notifications, setNotifications] = useState<string[]>([]);
  
    useEffect(() => {
      if (!socket) return;
      // Listen for admin notifications
      socket.on("adminNotification", (data) => {
        setNotifications((prev) => [...prev, data.message]);
      });
  
      // Listen for trainer notifications
    //   const trainerId = 5; // Replace with actual trainer ID from context/session
    //   socket.on(`trainerNotification_${trainerId}`, (data) => {
    //     setNotifications((prev) => [...prev, data.message]);
    //   });
  
      return () => {
        socket.off("adminNotification");
        // socket.off(`trainerNotification_${trainerId}`);
      };
    }, [socket]);


  return (
    <div>
     {notifications.length > 0 &&  <ul>
        {notifications.map((notif, index) => (
          <li key={index}>{notif}</li>
        ))}
      </ul>}
    </div>
  )
}

export default AdminDashboard;






