import {
  fetchCommunityPostsLikes,
  fetchIndivActionsBookmarks,
} from "@/app/_api/main/main-api";
import {
  QUERY_KEY_COMMUNITY_POSTS_LIKES,
  QUERY_KEY_INDIV_ACTIONS_BOOKMARKS,
} from "@/app/_api/queryKeys";
import { useQuery } from "@tanstack/react-query";

// 커뮤니티글 및 해당 likes 가져오기
export const useFetchCommunityPostsLikes = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY_COMMUNITY_POSTS_LIKES],
    queryFn: fetchCommunityPostsLikes,
  });
  return { data, isLoading, isError };
};

// 개인 green action, 해당 캠페인의 bookmarks 가져오기
export const useFetchIndivActionsBookmarks = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY_INDIV_ACTIONS_BOOKMARKS],
    queryFn: fetchIndivActionsBookmarks,
  });
  return { data, isLoading, isError };
};
