import { useQuery } from "@tanstack/react-query";
import { getIndividualDetail } from "@/app/_api/individualAction-detail/detail-api";
import { QUERY_KEY_INDIVIDUALACTION } from "@/app/_api/queryKeys";

export const useIndividualAction = ({ params }: { params: { id: string } }) => {
  // const action_id = params.id;
  const action_id = "f0be0faf-6024-4f88-b8f3-59c516181b74";
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY_INDIVIDUALACTION],
    queryFn: () => getIndividualDetail(params.id),
  });
  return { data, isLoading, isError };
};
