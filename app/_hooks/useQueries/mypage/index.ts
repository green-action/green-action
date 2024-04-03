import {
  fetchBookmarkedActions,
  fetchMyCommunityPosts,
  fetchMyGreenActions,
} from "@/app/_api/mypage/mypage-api";
import {
  QUERY_KEY_MY_BOOKMARK,
  QUERY_KEY_MY_COMMUNITYPOST,
  QUERY_KEY_MY_INDIVIDUALACTION,
} from "@/app/_api/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useFetchMyGreenActions = (user_uid: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY_MY_INDIVIDUALACTION],
    queryFn: () => fetchMyGreenActions(user_uid),
  });
  return { data, isLoading };
};

export const usefetchMyCommunityPosts = (user_uid: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY_MY_COMMUNITYPOST],
    queryFn: () => fetchMyCommunityPosts(user_uid),
  });
  return { data, isLoading };
};

export const usefetchBookmarkedActions = (user_uid: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY_MY_BOOKMARK],
    queryFn: () => fetchBookmarkedActions(user_uid),
  });
  return { data, isLoading };
};
