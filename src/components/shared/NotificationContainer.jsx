import React, { useEffect, useState } from "react";
import { NotificationService } from "../../services/NotificationService";

export default function NotificationContainer() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const unsubscribe = NotificationService.subscribe((notification) => {
      const id = Date.now();
      setNotifications((prev) => [...prev, { id, ...notification }]);
      // auto-remove after 3s
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 3000);
    });
    return unsubscribe;
  }, []);

  const getAlertClass = (type) => {
    switch (type) {
      case "success":
        return "alert-success";
      case "error":
        return "alert-error";
      case "info":
        return "alert-info";
      case "warning":
        return "alert-warning";
      default:
        return "alert";
    }
  };

  return (
    <div className="toast toast-top toast-end z-50">
      {notifications.map((n) => (
        <div key={n.id} className={`alert ${getAlertClass(n.type)} shadow-lg`}>
          <span>{n.message}</span>
        </div>
      ))}
    </div>
  );
}