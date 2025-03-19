import React, { createContext, useContext, useState } from "react";
import MessageDialog from "../dialogs/MessageDialog.jsx";

const MessageDialogContext = createContext();

export const useMessageDialog = () => {
  return useContext(MessageDialogContext);
};

export const MessageDialogProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const showMessage = (type, message) => {
    const id = Date.now();
    setMessages((prev) => [...prev, { id, type, message }]);
  };

  const hideMessage = (id) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  return (
    <MessageDialogContext.Provider value={{ showMessage }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col space-y-2">
        {messages.map(({ id, type, message }) => (
          <MessageDialog
            key={id}
            onClose={() => hideMessage(id)}
            type={type}
            message={message}
          />
        ))}
      </div>
    </MessageDialogContext.Provider>
  );
};
