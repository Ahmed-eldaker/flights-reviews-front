"use client";

import { FaPlane, FaStar, FaCheck, FaBell, FaTimes } from "react-icons/fa";
import { useState } from "react";

const notifications = [
  {
    id: 1,
    type: "review",
    message: "Your review for SkyJet Airways flight has been published",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "reservation",
    message: "Your flight to Tokyo has been confirmed",
    time: "1 day ago",
    read: true,
  },
  {
    id: 3,
    type: "system",
    message: "Welcome to FlightReview! Start by exploring available flights",
    time: "2 days ago",
    read: true,
  },
];

const NotificationDropdown = ({ isMobile = false }) => {
  const [notificationList, setNotificationList] = useState(notifications);

  const markAsRead = (id) => {
    setNotificationList(
      notificationList.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const removeNotification = (id) => {
    setNotificationList(
      notificationList.filter((notification) => notification.id !== id)
    );
  };

  const getIcon = (type) => {
    switch (type) {
      case "review":
        return <FaStar className="text-emerald-700" />;
      case "reservation":
        return <FaPlane className="text-gray-700" />;
      default:
        return <FaBell className="text-gray-500" />;
    }
  };

  return (
    <div
      className={`${
        isMobile ? "w-full" : "absolute right-0 mt-2 w-80"
      } bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700`}
    >
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
          Notifications
        </h3>
        <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
          {notificationList.filter((n) => !n.read).length} new
        </span>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notificationList.length === 0 ? (
          <div className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
            <FaBell className="mx-auto h-6 w-6 mb-2" />
            <p>No notifications</p>
          </div>
        ) : (
          notificationList.map((notification) => (
            <div
              key={notification.id}
              className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                !notification.read ? "bg-emerald-50 dark:bg-gray-700" : ""
              }`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-600 flex items-center justify-center">
                  {getIcon(notification.type)}
                </div>
                <div className="ml-3 w-0 flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    {notification.message}
                  </p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {notification.time}
                  </p>
                </div>
                <div className="ml-2 flex-shrink-0 flex">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="mr-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    >
                      <FaCheck className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <FaTimes className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
        <button className="text-xs text-emerald-700 dark:text-emerald-400 font-medium hover:text-emerald-800 dark:hover:text-emerald-300">
          Mark all as read
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;
