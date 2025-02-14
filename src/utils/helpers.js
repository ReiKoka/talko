import { format, isToday, isYesterday, startOfWeek, isAfter } from "date-fns";

export const formatMessageTime = (date) => {
  const messageDate = new Date(date);
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });

  if (isToday(messageDate)) {
    return format(messageDate, "h:mm a");
  }

  if (isYesterday(messageDate)) {
    return "Yesterday";
  }
  if (isAfter(messageDate, weekStart)) {
    return format(messageDate, "EEEE");
  }
  return format(messageDate, "dd/MM/yyyy");
};

export const isPicture = (filename) => {
  const validExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".svg",
    ".webp",
  ];
  return validExtensions.some((ext) => filename.toLowerCase().endsWith(ext));
};
