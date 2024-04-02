export const formatToLocaleDateTimeString = (dateTime: string): string => {
  return new Date(dateTime).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

export const formatToLocaleDateString = (dateTime: string): string => {
  return new Date(dateTime).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
