import {
  fetchBookmarkedActions,
  fetchMyCommunityPosts,
  fetchMyGreenActions,
} from "@/app/_api/mypage/mypage-list-api";
import { fetchUserInfo } from "@/app/_api/mypage/mypage-profile-api";
import {
  QUERY_KEY_MY_BOOKMARK,
  QUERY_KEY_MY_COMMUNITYPOST,
  QUERY_KEY_MY_INDIVIDUALACTION,
  QUERY_KEY_USER_INFO,
} from "@/app/_api/queryKeys";
import { useQuery } from "@tanstack/react-query";

// 유저 정보 가져오기
export const useFetchUserInfo = (user_uid: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY_USER_INFO, user_uid],
    queryFn: () => fetchUserInfo(user_uid),
  });
  return { data, isLoading, isError };
};

export const useFetchMyGreenActions = (user_uid: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY_MY_INDIVIDUALACTION, user_uid],
    queryFn: () => fetchMyGreenActions(user_uid),
  });
  return { data, isLoading, isError };
};

export const usefetchMyCommunityPosts = (user_uid: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY_MY_COMMUNITYPOST, user_uid],
    queryFn: () => fetchMyCommunityPosts(user_uid),
  });
  return { data, isLoading, isError };
};

export const usefetchBookmarkedActions = (user_uid: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEY_MY_BOOKMARK, user_uid],
    queryFn: () => fetchBookmarkedActions(user_uid),
  });
  if (error) {
    console.error(error.message);
  }
  return { data, isLoading, isError };
};
