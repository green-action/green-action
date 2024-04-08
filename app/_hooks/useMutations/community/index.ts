import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEY_COMMUNITYLIST } from "@/app/_api/queryKeys";

import {
  deleteCommunityPost,
  insertCommunityPostFormData,
} from "@/app/_api/community/community-api";
import { CommunityPostMutation } from "@/app/_types/community/community";

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

export const useInsertCommunityPostFormData = () => {
  const queryClient = useQueryClient();
  const { mutate: insertFormDataMutation } = useMutation({
    mutationFn: async ({
      formData,
      loggedInUserUid,
    }: CommunityPostMutation) => {
      const post_id = await insertCommunityPostFormData({
        formData,
        loggedInUserUid,
      });
      return post_id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_COMMUNITYLIST] });
    },
  });

  return { insertFormDataMutation };
};
