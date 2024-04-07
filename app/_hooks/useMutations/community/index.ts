import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEY_COMMUNITYLIST } from "@/app/_api/queryKeys";

import { deleteCommunityPost } from "@/app/_api/community/community-api";

export const useDeleteCommunityPostMutation = () => {
  const queryClient = useQueryClient();
  const { mutate: deletePostMutation } = useMutation({
    mutationFn: (post_id: string) => deleteCommunityPost(post_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_COMMUNITYLIST],
      });
    },
  });
  return { deletePostMutation };
};
