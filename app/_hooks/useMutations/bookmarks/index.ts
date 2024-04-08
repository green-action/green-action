import {
  addBookmark,
  addLikes,
  removeBookmark,
  removeLike,
} from "@/app/_api/bookmark/bookmarkQueries";
import {
  QUERY_KEY_BOOKMARK,
  QUERY_KEY_LIKES,
  QUERY_KEY_MY_BOOKMARK,
} from "@/app/_api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// usemuataion을 활용해서 export까지 해주면 됨

export const useAddBookmark = (mode: string) => {
  const queryClient = useQueryClient();
  const addBookmarkMutation = useMutation({
    mutationFn: addBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_BOOKMARK],
      });
      mode === "myPosts" &&
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY_MY_BOOKMARK],
        });
    },
    onError: () => {
      alert("처리에 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });
  return addBookmarkMutation;
};

export const useRemoveBookmark = (mode?: string) => {
  const queryClient = useQueryClient();
  const removeBookmarkMutation = useMutation({
    mutationFn: removeBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_BOOKMARK],
      });
      (mode === "myBookmarks" || mode === "myPosts") &&
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY_MY_BOOKMARK],
        });
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
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_COMMUNITYLIST],
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
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_COMMUNITYLIST],
      });
    },
  });
  return removeLikeMutation;
};
