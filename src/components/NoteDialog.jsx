import React, { useState, useEffect } from "react";
import { format, isSameDay } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, RotateCcw, Save } from "lucide-react";

export default function NoteDialog({
  isOpen,
  onClose,
  startDate,
  endDate,
  initialTask,
  onSave,
}) {
  const [taskText, setTaskText] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTaskText(initialTask?.text || "");
      setIsCompleted(initialTask?.completed || false);
      setError("");
    }
  }, [isOpen, initialTask]);

  const handleSave = () => {
    if (!taskText.trim()) {
      setError("Please mention the note.");
      return;
    }
    onSave({
      id: initialTask?.id || Date.now(),
      start: startDate,
      end: endDate,
      text: taskText,
      completed: isCompleted,
    });
  };

  if (!isOpen) return null;

  const dateRangeString =
    startDate && endDate && !isSameDay(startDate, endDate)
      ? `${format(startDate, "MMM do")} - ${format(endDate, "MMM do")}`
      : startDate
        ? format(startDate, "MMMM do, yyyy")
        : "";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/1 backdrop-blur-lg rounded-3xl">

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100"
        >

          <div className="bg-gradient-to-r from-blue-500 to-blue-900 p-4 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="mt-2">
              <h3 className="text-2xl font-bold">Manage Task</h3>
              <p className="text-blue-100 font-medium opacity-90">
                {dateRangeString}
              </p>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                Task Description
              </label>
              <textarea
                autoFocus
                placeholder="Ask the task..."
                value={taskText}
                onChange={(e) => {
                  setTaskText(e.target.value);
                  if (error) setError("");
                }}
                className={`w-full h-32 p-4 rounded-2xl resize-none outline-none text-slate-700 bg-slate-50 border-2 transition-all focus:bg-white ${
                  error
                    ? "border-red-400"
                    : "border-transparent focus:border-blue-500"
                }`}
                spellCheck="false"
              />
              {error && (
                <p className="text-red-500 text-xs font-bold ml-1">{error}</p>
              )}
            </div>
          </div>

          <div className="px-8 pb-8 pt-2 flex flex-col gap-3">
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="flex-[2] py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 group"
              >
                <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />{" "}
                Save Task
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
