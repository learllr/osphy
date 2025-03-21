import React from "react";

export default function PageSubNavBar({
  subMenuItems,
  activeSubTab,
  onSubTabChange,
}) {
  return (
    <div className="w-full flex justify-center text-sm">
      <nav className="bg-white/80 backdrop-blur-lg shadow-sm border rounded-lg px-4 py-2 flex space-x-2 md:space-x-4">
        {subMenuItems.map(({ label, path }, index) => (
          <button
            key={index}
            onClick={() => onSubTabChange(path)}
            className={`px-3 py-1.5 rounded-md font-medium transition-all duration-300
              ${
                activeSubTab === path
                  ? "bg-primary text-white shadow"
                  : "text-gray-700 hover:bg-gray-100 hover:text-primary"
              }`}
          >
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}
