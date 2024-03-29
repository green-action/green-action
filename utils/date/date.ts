export const formatToLocaleDateTimeString = (dateTime: string): string => {
  return new Date(dateTime).toLocaleDateString("ko-KR", {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};
