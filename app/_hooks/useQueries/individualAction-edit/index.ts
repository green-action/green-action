import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY_INDIVIDUALACTION_FOR_EDIT } from "@/app/_api/queryKeys";
import { getActionForEdit } from "@/app/_api/individualAction-edit/edit-api";

export const useGetActionForEdit = (action_id: string) => {
  // 페이지 접근시 action_id의 기존 데이터 가져오기
  const {
    data: originalActionData,
    isLoading: isOriginalDataLoading,
    isError: isOriginalDataError,
  } = useQuery({
    queryKey: [QUERY_KEY_INDIVIDUALACTION_FOR_EDIT],

    queryFn: () => getActionForEdit(action_id),
  });

  return { originalActionData, isOriginalDataLoading, isOriginalDataError };
};
