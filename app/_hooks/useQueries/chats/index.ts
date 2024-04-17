import { useQuery } from "@tanstack/react-query";
import { getMessages } from "@/app/_api/messages/privateChat-api";
import { QUERY_KEY_CHAT_LIST } from "@/app/_api/queryKeys";

export const useGetMessagesList = ({
  roomId,
  loggedInUserUid,
}: {
  roomId: string;
  loggedInUserUid: string;
}) => {
  const {
    data: messagesList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEY_CHAT_LIST, loggedInUserUid],
    queryFn: () => getMessages(roomId),
  });

  return { messagesList, isLoading, isError };
};
