import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QEURY_KEY_COMMUNITY_COMMENTS_LIST } from "@/app/_api/queryKeys";
import {
  deleteComment,
  editComment,
  insertCommunityComment,
} from "@/app/_api/community/comments-api";

export const useInsertCommunityCommentMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: insertCommentMutation } = useMutation({
    mutationFn: async ({
      content,
      loggedInUserUid,
      post_id,
    }: {
      content: string;
      loggedInUserUid: string;
      post_id: string;
    }) => {
      await insertCommunityComment({ content, loggedInUserUid, post_id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QEURY_KEY_COMMUNITY_COMMENTS_LIST],
      });
    },
  });
  return { insertCommentMutation };
};

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteCommentMutation } = useMutation({
    mutationFn: (comment_id: string) => deleteComment(comment_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QEURY_KEY_COMMUNITY_COMMENTS_LIST],
      });
    },
  });

  return { deleteCommentMutation };
};

export const useEditCommentMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: editCommentMutation } = useMutation({
    mutationFn: ({
      comment_id,
      editedComment,
    }: {
      comment_id: string;
      editedComment: string;
    }) => editComment({ comment_id, editedComment }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QEURY_KEY_COMMUNITY_COMMENTS_LIST],
      });
    },
  });

  return { editCommentMutation };
};
