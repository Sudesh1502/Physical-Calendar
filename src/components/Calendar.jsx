import React, { useState, useEffect } from "react";
import { addMonths, subMonths, isSameDay, format, startOfDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "./HeroSection";
import DateGrid from "./DateGrid";
import NotesArea from "./NotesArea";
import NoteDialog from "./NoteDialog";
import TagDialog from "./TagDialog";
import {
  getTasks,
  saveTasks,
  getTags,
  saveTags,
  monthData,
} from "../utils/calendar";
import TaskList from "./TasksList";
import { MorphingText } from "./ui/morphing-text";

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectionStart, setSelectionStart] = useState(null);
  const [selectionEnd, setSelectionEnd] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeDate, setActiveDate] = useState(startOfDay(new Date()));
  const [showTaskInfo, setShowTaskInfo] = useState(true);


  const [tasks, setTasks] = useState([]);
  const [tags, setTags] = useState({});

  
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [curMonthInfo, setCurMonthInfo] = useState(null);

  useEffect(() => {
    setTasks(getTasks());
    setTags(getTags());
  }, [selectedTask]);

  useEffect(() => {},[selectedTask])

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = subMonths(prev, 1);

      const monthName = newDate.toLocaleString("default", { month: "long" });
      const d = monthData[monthName.toLowerCase()];

      setCurMonthInfo(d);

      return newDate;
    });
  };
  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = addMonths(prev, 1);

      const monthName = newDate.toLocaleString("default", { month: "long" });
      const d = monthData[monthName.toLowerCase()];

      setCurMonthInfo(d);

      return newDate;
    });
  };


  //handles the date selected
  const handleDateSelect = (date) => {
    setActiveDate(date);

    if (!selectionStart || (selectionStart && selectionEnd)) {
      setSelectionStart(date);
      setSelectionEnd(null);
    } else {
      if (isSameDay(date, selectionStart)) {
        setSelectionStart(null);
      } else {
        const start = date < selectionStart ? date : selectionStart;
        const end = date < selectionStart ? selectionStart : date;
        setSelectionStart(start);
        setSelectionEnd(end);
        setIsTaskModalOpen(true);
      }
    }
  };

  const handleDoubleSelect = (date) => {
    setActiveDate(date);
    setIsTagModalOpen(true);
  };

  const handleSaveTask = (taskData) => {
    const newTasks = [...tasks, taskData];
    setTasks(newTasks);
    saveTasks(newTasks);
    setIsTaskModalOpen(false);
    setSelectionStart(null);
    setSelectionEnd(null);
  };

  const handleResetRange = () => {
    setSelectionStart(null);
    setSelectionEnd(null);
    setIsTaskModalOpen(false);
  };

  const handleSaveTag = (date, tagType) => {
    const dateKey = format(date, "yyyy-MM-dd");
    const newTags = { ...tags };
    if (tagType) {
      newTags[dateKey] = tagType;
    } else {
      delete newTags[dateKey];
    }
    setTags(newTags);
    saveTags(newTags);
    setIsTagModalOpen(false);

    setSelectionStart(null);
  setSelectionEnd(null);
  };

  return (
    <div
      className="w-full max-w-3xl mx-auto md:my-4 shadow-premium bg-white rounded-3xl flex flex-col relative hello no-scrollbar max-h-200 "
      style={{ perspective: "1200px" }}
    >
     
      <div className="absolute -top-3 md:-top-4 left-0 w-full z-40 pointer-events-none flex justify-center">
        <img
          src="/spiral-binding.svg"
          alt=""
          className="w-[95%] max-w-3xl drop-shadow-md"
        />
      </div>
      <div className="relative">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentMonth.toString()}
            initial={{ rotateX: 90, opacity: 0, transformOrigin: "top" }}
            animate={{ rotateX: 0, opacity: 1, transformOrigin: "top" }}
            exit={{ rotateX: -90, opacity: 0, transformOrigin: "top" }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
            className="w-full flex flex-col bg-[#fbfbfb] rounded-3xl overflow-hidden shadow-inner"
          >
            <HeroSection
              currentMonth={currentMonth}
              activeDate={activeDate}
              curMonthInfo={curMonthInfo}
            />
            
            <div className="flex flex-col md:grid md:grid-cols-3 gap-0 h-auto min-h-[20rem]">
            
              <div className="order-1 md:order-2 col-span-1 md:col-span-2 flex flex-col p-2 md:p-6 bg-white z-20">
                <div className="flex items-center justify-end gap-4 w-full">
                 
                  <h2 className="text-lg md:text-xl font-extrabold text-slate-800 tracking-tighter truncate">
                    {selectedTask ? selectedTask.text : curMonthInfo?.text || "Refine your skills — mastery is built in iterations."}
                  </h2>

                 
                  {selectedTask && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 border border-blue-100/30 rounded-lg shrink-0">
                      <span className="text-[10px] md:text-xs font-black text-blue-600 uppercase tracking-tight whitespace-nowrap">
                        {format(selectedTask.start, "MMM d")} —{" "}
                        {format(selectedTask.end, "MMM d")}
                      </span>
                    </div>
                  )}
                </div>

                <div className="h-full w-full">
                  <DateGrid
                    currentMonth={currentMonth}
                    selectionStart={selectionStart}
                    selectionEnd={selectionEnd}
                    activeDate={activeDate}
                    onDateSelect={handleDateSelect}
                    onDateDoubleSelect={handleDoubleSelect}
                    tasks={tasks}
                    tags={tags}
                  />
                </div>
              </div>
              
              <div className="order-2 md:order-1 col-span-1 border-t md:border-t-0 md:border-r border-gray-100 flex flex-col p-4 md:p-6 gap-3 md:-mt-8 z-20 bg-[#fbfbfb] md:bg-transparent">
               
                <div className="w-full h-24 md:h-36 shadow-sm rounded-xl overflow-hidden bg-white">
                  <NotesArea currentMonth={currentMonth} />
                </div>
               
                <div className="flex-grow w-full bg-white md:bg-gray-200/30 rounded-xl border border-gray-100 md:border-blue-50/50 shadow-inner overflow-hidden min-h-[150px]">
                  <div className="p-3 overflow-y-auto max-h-50">
                    <TaskList
                      tasks={tasks}
                      setTasks={setTasks}
                      setSelectedTask={setSelectedTask}
                      selectedTask={selectedTask}
                      setShowTaskInfo={setShowTaskInfo}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between items-center bg-white p-2 rounded-xl shadow-sm border border-gray-100 mb-4 md:mb-0">
                  <button
                    onClick={handlePrevMonth}
                    className="flex text-xs items-center gap-1 font-bold tracking-widest px-4 py-2 hover:bg-gray-50 text-gray-700 rounded-lg uppercase"
                  >
                    <ChevronLeft className="w-3 h-3" /> Prev
                  </button>
                  <button
                    onClick={handleNextMonth}
                    className="flex text-xs items-center gap-1 font-bold tracking-widest px-4 py-2 hover:bg-gray-50 text-gray-700 rounded-lg uppercase"
                  >
                    Next <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ==================================================Task Dialog ==================================================*/}
      <NoteDialog
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        startDate={selectionStart}
        endDate={selectionEnd}
        onSave={handleSaveTask}
        onReset={handleResetRange}
      />

      {/* ====================================================Tag Dialog==================================================== */}
      <TagDialog
        isOpen={isTagModalOpen}
        onClose={() => setIsTagModalOpen(false)}
        date={activeDate}
        currentTag={tags[format(activeDate, "yyyy-MM-dd")]}
        onSaveTag={handleSaveTag}
      />
    </div>
  );
}
