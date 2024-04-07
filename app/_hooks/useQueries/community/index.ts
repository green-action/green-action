import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY_COMMUNITYLIST } from "@/app/_api/queryKeys";
import { getCommunityList } from "@/app/_api/community/community-api";

export const useGetCommunityList = () => {
  const {
    data: communityList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEY_COMMUNITYLIST],
    queryFn: getCommunityList,
  });

  return { communityList, isLoading, isError };
};
