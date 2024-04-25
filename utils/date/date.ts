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

// ex) 오전 4:03
export const todayFormatTime = (timeString: string) => {
  const date = new Date(timeString);
  const hours = (date.getHours() % 12 || 12).toString();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "오후" : "오전";

  return `${ampm} ${hours}:${minutes}`;
};

// ex) 4월 23일
export const previousFormatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${month}월 ${day}일`;
};
