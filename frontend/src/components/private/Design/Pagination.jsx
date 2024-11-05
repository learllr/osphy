import React from "react";
import { Button } from "@/components/ui/button";

export default function Pagination({ totalPages, currentPage, onPageChange }) {
  return (
    <div className="flex justify-center mt-6 space-x-2">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (pageNumber) => (
          <Button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            variant={currentPage === pageNumber ? "primary" : "outline"}
            className={`px-3 py-1 rounded-lg transition-colors duration-300 ${
              currentPage === pageNumber
                ? "bg-primary text-white"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {pageNumber}
          </Button>
        )
      )}
    </div>
  );
}
