import { useQuery } from "@tanstack/react-query";

import {
  QUERY_KEY_COMMUNITYLIST,
  QUERY_KEY_COMMUNITY_POST,
} from "@/app/_api/queryKeys";

import {
  getCommunityList,
  getPostContents,
} from "@/app/_api/community/community-api";

export const useGetCommunityList = () => {
  const {
    data: communityList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEY_COMMUNITYLIST],
    queryFn: getCommunityList,
  });

  return { communityList, isLoading, isError };
};

export const useGetPostContents = (post_id: string) => {
  const {
    data: communityPost,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useQuery({
    queryKey: [QUERY_KEY_COMMUNITY_POST, post_id],
    queryFn: () => getPostContents(post_id),
  });

  return { communityPost, isPostLoading, isPostError };
};
