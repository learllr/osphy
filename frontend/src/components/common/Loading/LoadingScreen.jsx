import React from "react";

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-primary border-solid border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
