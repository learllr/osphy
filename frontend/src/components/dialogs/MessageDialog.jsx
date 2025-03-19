import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ICONS = {
  error: <AlertCircle className="text-red-500 w-5 h-5" />,
  warning: <AlertTriangle className="text-yellow-500 w-5 h-5" />,
  info: <Info className="text-blue-500 w-5 h-5" />,
  success: <CheckCircle className="text-green-500 w-5 h-5" />,
};

const DURATION = 5000;
const FADE_DURATION = 300;

export default function MessageDialog({ onClose, type = "info", message }) {
  const [progress, setProgress] = useState(100);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const startTimeRef = useRef(Date.now());
  const intervalRef = useRef(null);
  const fadeTimeoutRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.max(100 - (elapsed / DURATION) * 100, 0);
      setProgress(newProgress);

      if (elapsed >= DURATION) {
        clearInterval(intervalRef.current);
        setIsFadingOut(true);
        fadeTimeoutRef.current = setTimeout(onClose, FADE_DURATION);
      }
    }, 50);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(fadeTimeoutRef.current);
    };
  }, []);

  const triggerClose = () => {
    setIsFadingOut(true);
    clearInterval(intervalRef.current);
    setTimeout(onClose, FADE_DURATION);
  };

  return (
    <div
      className={cn(
        "relative w-80 p-4 shadow-lg rounded-lg bg-white border border-gray-200 flex items-center space-x-3 overflow-hidden",
        "transition-opacity duration-300",
        isFadingOut ? "opacity-0" : "opacity-100"
      )}
    >
      {ICONS[type] || ICONS.info}
      <div className="flex-1 text-sm text-gray-800">{message}</div>
      <button
        onClick={triggerClose}
        className="text-gray-400 hover:text-gray-600 transition"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="absolute bottom-0 -left-3 w-full h-1 bg-gray-300">
        <div
          className={cn(
            "h-1",
            type === "error" && "bg-red-500",
            type === "warning" && "bg-yellow-500",
            type === "info" && "bg-blue-500",
            type === "success" && "bg-green-500"
          )}
          style={{
            width: `${progress}%`,
            transition: "width 0.1s linear",
          }}
        />
      </div>
    </div>
  );
}
