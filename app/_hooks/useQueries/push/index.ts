import { fetchMyCommunityList } from "@/app/_api/push/push-api";
import { QUERY_KEY_MY_COMMUNITYLIST } from "@/app/_api/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useMyCommunityList = (id: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY_MY_COMMUNITYLIST],
    queryFn: () => fetchMyCommunityList(id),
  });
  return { data, isLoading, isError };
};
