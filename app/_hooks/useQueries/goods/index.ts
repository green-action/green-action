import { useQuery } from "@tanstack/react-query";
import { getGoods } from "@/app/_api/goods/goods_api";
import { QUERY_KEY_GOODS } from "@/app/_api/queryKeys";

export const useGoods = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY_GOODS],
    queryFn: getGoods,
  });
  return { data, isLoading, isError };
};
