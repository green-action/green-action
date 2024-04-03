import {
  getFilterBookmark,
  getFilterLikes,
} from "@/app/_api/bookmark/bookmarkQueries";
import { QUERY_KEY_BOOKMARK, QUERY_KEY_LIKES } from "@/app/_api/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useFilterBookmark = (action_id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY_BOOKMARK, action_id],
    queryFn: () => getFilterBookmark(action_id),
  });
  return { data, isLoading };
};

export const useFilterLikes = (post_id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY_LIKES],
    queryFn: () => getFilterLikes(post_id),
  });
  return { data, isLoading };
};
