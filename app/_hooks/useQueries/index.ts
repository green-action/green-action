import { QUERY_KEY_GROUPACTION } from "@/app/_api/queryKeys";
import { supabase } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const getGroupAction = async () => {
  const { data: groupGreenActions, error } = await supabase
    .from("group_green_actions")
    .select("*");
  if (error) {
    throw new Error(error?.message || "에러가 발생했습니다.");
  }
  return { groupGreenActions, error };
};

export const useGroupAction = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY_GROUPACTION],
    queryFn: getGroupAction,
  });
  return { data, isLoading };
};
