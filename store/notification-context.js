import { createContext, useState } from "react";

const NotificationContext = createContext({
  Notification: null, // { title, message, status }
  showNotification: function() {},
  hideNotification: function() {}
});

export function NotificationContextProvider(props) {
  const [ activeNotification, setActiveNotification ] = useState();

  function showNotificationHandler(notificationData) {
    setActiveNotification(notificationData);
  }

  function hideNotificationHandler() {
    setActiveNotification(null);
  }

  const context = { 
    Notification: activeNotification, 
    showNotification: showNotificationHandler, 
    hideNotification: hideNotificationHandler, 
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;