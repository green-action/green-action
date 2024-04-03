import {
  fetchBookmarkedActions,
  fetchMyCommunityPosts,
  fetchMyGreenActions,
  fetchUserInfo,
} from "@/app/_api/mypage/mypage-api";
import {
  QUERY_KEY_MY_BOOKMARK,
  QUERY_KEY_MY_COMMUNITYPOST,
  QUERY_KEY_MY_INDIVIDUALACTION,
  QUERY_KEY_USER_INFO,
} from "@/app/_api/queryKeys";
import { useQuery } from "@tanstack/react-query";

// 유저 정보 가져오기
export const useFetchUserInfo = (user_uid: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY_USER_INFO, user_uid],
    queryFn: () => fetchUserInfo(user_uid),
  });
  // console.log("🐰 ~ useFetchUserInfo ~ data : ", data);
  return { data, isLoading };
};

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
