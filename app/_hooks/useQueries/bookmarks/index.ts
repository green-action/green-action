import { getBookmark, getLikes } from "@/app/_api/bookmark/bookmarkQueries";
import { QUERY_KEY_BOOKMARK, QUERY_KEY_USER } from "@/app/_api/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useBookmark = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY_BOOKMARK],
    queryFn: getBookmark,
  });
  return { data, isLoading };
};

export const useLikes = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["likes"],
    queryFn: getLikes,
  });
  return { data, isLoading };
};
