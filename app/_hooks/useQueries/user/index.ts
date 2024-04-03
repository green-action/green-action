import { getUser } from "@/app/_api/auth";
import { QUERY_KEY_USER } from "@/app/_api/queryKeys";
import { useQuery } from "@tanstack/react-query";

// 유저정보(metadata) 가져오기
export const useQueryUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY_USER],
    queryFn: getUser,
  });
  const userMetadata = data?.user?.user_metadata;
  return { userMetadata, isLoading };
};

// // 유저uid만 가져오기
// export const useQueryUserUid = () => {
//   const { data, isLoading } = useQuery({
//     queryKey: [QUERY_KEY_USER],
//     queryFn: getUser,
//   });
//   const userUid = data?.user?.user_metadata.sub;
//   return { userUid };
// };
