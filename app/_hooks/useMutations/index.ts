import {
  addBookmark,
  removeBookmark,
} from "@/app/_api/bookmark/bookmarkQueries";
import { QUERY_KEY_BOOKMARK } from "@/app/_api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// usemuataion을 활용해서 export까지 해주면 됨

export const useAddBookmark = () => {
  const queryClient = useQueryClient();
  const addBookmarkMutation = useMutation({
    mutationFn: async () => addBookmark,
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
