import { getGoods, getPoint } from "@/app/_api/goods/goods_api";
import { QUERY_KEY_GOODS, QUERY_KEY_USER_POINT } from "@/app/_api/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useGoods = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY_GOODS],
    queryFn: getGoods,
  });
  return { data, isLoading, isError };
};

export const useUserPoint = () => {
  const session = useSession();
  const id = session.data?.user.user_uid;
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY_USER_POINT],
    queryFn: () => getPoint(id as string),
    enabled: !!id,
  });
  return { data, isLoading, isError };
};
