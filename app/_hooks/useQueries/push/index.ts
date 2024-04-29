import {
  fetchCommentWriterInfo,
  fetchMyCommunityList,
  fetchMyPushList,
  unreadPushCount,
} from "@/app/_api/push/push-api";
import {
  QUERY_KEY_COMMENT_WRITER_INFO,
  QUERY_KEY_MY_COMMUNITYLIST,
  QUERY_KEY_MY_PUSHLIST,
  QUERY_KEY_UNREAD_PUSH_COUNT,
} from "@/app/_api/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useMyCommunityList = (id: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY_MY_COMMUNITYLIST],
    queryFn: () => fetchMyCommunityList(id),
  });
  return { data, isLoading, isError };
};

export const useCommentWriterInfo = (id: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY_COMMENT_WRITER_INFO],
    queryFn: () => fetchCommentWriterInfo(id),
  });
  return { data, isLoading, isError };
};

export const useMyPushList = (id: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY_MY_PUSHLIST],
    queryFn: () => fetchMyPushList(id),
  });
  return { data, isLoading, isError };
};

export const useUnreadPushCount = (id: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY_UNREAD_PUSH_COUNT],
    queryFn: () => unreadPushCount(id),
  });
  return { data, isLoading, isError };
};
