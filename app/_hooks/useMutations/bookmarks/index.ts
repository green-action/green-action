import {
  addBookmark,
  addLikes,
  removeBookmark,
  removeLike,
} from "@/app/_api/bookmark/bookmarkQueries";
import { QUERY_KEY_BOOKMARK, QUERY_KEY_LIKES } from "@/app/_api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// usemuataion을 활용해서 export까지 해주면 됨

export const useAddBookmark = () => {
  const queryClient = useQueryClient();
  const addBookmarkMutation = useMutation({
    mutationFn: addBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_BOOKMARK] });
    },
  });
  return addBookmarkMutation;
};

export const useRemoveBookmark = () => {
  const queryClient = useQueryClient();
  const removeBookmarkMutation = useMutation({
    mutationFn: removeBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_BOOKMARK] });
    },
  });
  return removeBookmarkMutation;
};

export const useAddLike = () => {
  const queryClient = useQueryClient();
  const addLikeMutation = useMutation({
    mutationFn: addLikes,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_LIKES],
      });
    },
  });
  return addLikeMutation;
};

export const useRemoveLike = () => {
  const queryClient = useQueryClient();
  const removeLikeMutation = useMutation({
    mutationFn: removeLike,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_LIKES],
      });
    },
  });
  return removeLikeMutation;
};
