import { getGroupAction } from "@/app/_api/groupAction/getGroupAction";
import { QUERY_KEY_GROUPACTION } from "@/app/_api/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useGroupAction = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY_GROUPACTION],
    queryFn: getGroupAction,
  });
  return { data, isLoading, isError };
};
