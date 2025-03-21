import React from "react";

export default function PageNavBar({
  menuItems,
  activeTab,
  onTabChange,
  activeSubTab,
  onSubTabChange,
}) {
  return (
    <div className="w-full flex flex-col items-center space-y-3">
      <nav className="bg-white/80 backdrop-blur-lg shadow-md border rounded-full px-6 py-3 flex space-x-3 md:space-x-6 text-md">
        {menuItems.map(({ label, path, icon: Icon }, index) => (
          <button
            key={index}
            onClick={() => onTabChange(path)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 
              ${
                activeTab === path
                  ? "bg-primary text-white shadow-md scale-105"
                  : "text-gray-700 hover:bg-gray-100 hover:text-primary hover:scale-105"
              }`}
          >
            {Icon && <Icon className="w-5 h-5" />}
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {menuItems.find((item) => item.path === activeTab)?.subMenu.length >
        0 && (
        <nav className="bg-white/80 backdrop-blur-lg shadow-sm border rounded-lg px-4 py-2 flex flex-wrap justify-center gap-2 md:gap-4 text-sm">
          {menuItems
            .find((item) => item.path === activeTab)
            ?.subMenu.map(({ label, path }, index) => (
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
      )}
    </div>
  );
}
