import { useQuery } from "@tanstack/react-query";

import { QEURY_KEY_COMMUNITY_COMMENTS_LIST } from "@/app/_api/queryKeys";

import { getCommunityCommentsList } from "@/app/_api/community/comments-api";

export const useGetCommunityCommentsList = (post_id: string) => {
  const {
    data: communityComments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useQuery({
    queryKey: [QEURY_KEY_COMMUNITY_COMMENTS_LIST],
    queryFn: () => getCommunityCommentsList(post_id),
  });

  return { communityComments, isCommentsLoading, isCommentsError };
};
