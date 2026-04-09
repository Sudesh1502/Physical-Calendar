import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns';

export function getCalendarDays(month) {
  const start = startOfWeek(startOfMonth(month), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(month), { weekStartsOn: 1 });
  
  return eachDayOfInterval({ start, end });
}

export function isDateInRange(date, start, end) {
  if (!start || !end) return false;
  // If end is before start (user clicked inverted), swap logic internally or handle in component
  // Better to handle swapping in component and ensure start <= end here
  const actualStart = start > end ? end : start;
  const actualEnd = start > end ? start : end;
  
  return date > actualStart && date < actualEnd;
}

export function isDateSelected(date, selectionStart, selectionEnd) {
  if (selectionStart && isSameDay(date, selectionStart)) return true;
  if (selectionEnd && isSameDay(date, selectionEnd)) return true;
  return false;
}

const TASKS_KEY = 'calendar_range_tasks';
const TAGS_KEY = 'calendar_date_tags';

export function getTasks() {
  try {
    const data = localStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function saveTasks(tasks) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

export function getTags() {
  try {
    const data = localStorage.getItem(TAGS_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    return {};
  }
}

export function saveTags(tags) {
  localStorage.setItem(TAGS_KEY, JSON.stringify(tags));
}


// utils.js or a new file like monthData.js

import jan from "../assets/jan.webp";
import feb from "../assets/feb.jpg";
import mar from "../assets/march.jpg";
import apr from "../assets/april.jpg";
import may from "../assets/may.jpg";
import june from "../assets/june.jpg";
import july from "../assets/july.jpg";
import aug from "../assets/aug.jpg";
import sep from "../assets/sep.jpg";
import oct from "../assets/oct.avif";
import nov from "../assets/nov.jpg";
import dec from "../assets/dec.webp";

export const monthData = {
  january: {
    image: jan,
    text: "New year, new systems — focus on consistency, not hype.",
  },
  february: {
    image: feb,
    text: "Stay disciplined — progress compounds quietly.",
  },
  march: {
    image: mar,
    text: "Execution beats planning — ship something this month.",
  },
  april: {
    image: apr,
    text: "Refine your skills — mastery is built in iterations.",
  },
  may: {
    image: may,
    text: "Push your limits — growth starts where comfort ends.",
  },
  june: {
    image: june,
    text: "Halfway there — audit your goals and realign.",
  },
  july: {
    image: july,
    text: "Stay resilient — small steps still move you forward.",
  },
  august: {
    image: aug,
    text: "Own your time — what you do daily defines you.",
  },
  september: {
    image: sep,
    text: "Level up — upgrade your habits and standards.",
  },
  october: {
    image: oct,
    text: "Stay focused — eliminate distractions aggressively.",
  },
  november: {
    image: nov,
    text: "Finish strong — consistency now beats past effort.",
  },
  december: {
    image: dec,
    text: "Reflect, reset, and prepare for a stronger comeback.",
  },
};
