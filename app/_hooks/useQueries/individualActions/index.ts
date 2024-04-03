import { useQuery } from "@tanstack/react-query";
import { getIndividualDetail } from "@/app/_api/individualAction-detail/detail-api";
import { QUERY_KEY_INDIVIDUALACTION } from "@/app/_api/queryKeys";

export const useIndividualAction = ({ params }: { params: { id: string } }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY_INDIVIDUALACTION],
    queryFn: () => getIndividualDetail(params.id),
  });
  return { data, isLoading, isError };
};
