import { useQuery } from "@tanstack/react-query";
import { getGoods, getPoint } from "@/app/_api/goods/goods_api";
import { QUERY_KEY_GOODS, QUERY_KEY_USER_POINT } from "@/app/_api/queryKeys";

export const useGoods = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY_GOODS],
    queryFn: getGoods,
  });
  return { data, isLoading, isError };
};

export const useUserPoint = (id: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY_USER_POINT],
    queryFn: () => getPoint(id),
  });
  return { data, isLoading, isError };
};
