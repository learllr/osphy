import { Button } from "@/components/ui/button";
import React from "react";
import { FaEdit } from "react-icons/fa";

export default function Section({
  title,
  children,
  onEdit,
  showCount = true,
  count,
}) {
  return (
    <div className="bg-white p-6 rounded-md border border-gray-200 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">
          {title} {showCount && `(${count})`}
        </h2>
        <Button
          onClick={onEdit}
          className="p-2 text-primary bg-white hover:bg-white hover:text-primary/90"
          aria-label={`Modifier ${title}`}
        >
          <FaEdit size={20} />
        </Button>
      </div>
      {children}
    </div>
  );
}
