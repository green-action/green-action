import { useMutation, useQueryClient } from "@tanstack/react-query";

import type {
  CommunityEditMutation,
  CommunityPostMutation,
} from "@/app/_types/community/community";

import {
  QUERY_KEY_COMMUNITYLIST,
  QUERY_KEY_COMMUNITY_POST,
  QUERY_KEY_COMMUNITY_POSTS_LIKES,
  QUERY_KEY_MY_COMMUNITYPOST,
} from "@/app/_api/queryKeys";

import {
  deleteCommunityPost,
  insertCommunityPostFormData,
} from "@/app/_api/community/community-api";
import { updateEditedPost } from "@/app/_api/community/communityEdit-api";

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

export const useUpdateEditPostMutation = (mode: string) => {
  const queryClient = useQueryClient();
  const { mutate: updatePostMutation } = useMutation({
    mutationFn: ({ post_id, imgUrl, formData }: CommunityEditMutation) =>
      updateEditedPost({
        post_id,
        imgUrl,
        formData,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_COMMUNITY_POST],
      });
      mode === "main" &&
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY_COMMUNITY_POSTS_LIKES],
        });
      mode === "community" &&
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY_COMMUNITYLIST],
        });
      mode === "myPosts" &&
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY_MY_COMMUNITYPOST],
        });
    },
  });

  return { updatePostMutation };
};
