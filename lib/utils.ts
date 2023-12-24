import { type ClassValue, clsx } from "clsx";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInWeeks,
  differenceInYears,
} from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDateDifference(dateLeft: string, dateRight: string) {
  const mins = differenceInMinutes(new Date(dateLeft), new Date(dateRight));
  if (mins < 60) return `${mins} min ago`;
  const hours = differenceInHours(new Date(dateLeft), new Date(dateRight));
  if (hours < 24) return `${hours} hours ago`;
  const days = differenceInDays(new Date(dateLeft), new Date(dateRight));
  if (days === 1) return `yesterday`;
  if (days < 7) return `${days} days ago`;
  const weeks = differenceInWeeks(new Date(dateLeft), new Date(dateRight));
  if (weeks === 1) return `last week`;
  if (weeks <= 4) return `${weeks} weeks ago`;
  const months = differenceInMonths(new Date(dateLeft), new Date(dateRight));
  if (months === 1) return `last month`;
  if (months < 12) return `${months} months ago`;
  const years = differenceInYears(new Date(dateLeft), new Date(dateRight));
  if (years === 1) return `last year`;
  if (years > 1) return `${years} years ago`;
}
