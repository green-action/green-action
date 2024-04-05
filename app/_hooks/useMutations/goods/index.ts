import { updatePoint } from "@/app/_api/goods/goods_api";
import {
  QUERY_KEY_USER_INFO,
  QUERY_KEY_USER_POINT,
} from "@/app/_api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUserPoint = () => {
  // const queryClient = useQueryClient();
  // const { mutate: pointMutation } = useMutation({
  //   mutationFn: ({ user_uid, updatedPoint }: { user_uid: string; updatedPoint: number }) =>
  //     updatePoint({ user_uid, updatedPoint }),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: [QUERY_KEY_USER_POINT] });
  //   },
  //   onError: () => {
  //     alert("처리에 오류가 발생했습니다. 다시 시도해주세요.");
  //   },
  // });
  // const updateUserPoint = async ({
  //   id,
  //   newPoint,
  // }: {
  //   id: string;
  //   newPoint: number;
  // }) => {
  //   pointMutation({ id, newPoint });
  // };
  // return { updateUserPoint };
  /////  //
  // const queryClient = useQueryClient();
  // const { mutate: pointMutation } = useMutation({
  //   mutationFn: ({
  //     user_uid,
  //     updatedPoint,
  //   }: {
  //     user_uid: string;
  //     updatedPoint: number;
  //   }) => updatePoint({ user_uid, updatedPoint }),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: [QUERY_KEY_USER_INFO] });
  //   },
  //   onError: () => {
  //     alert("처리에 오류가 발생했습니다. 다시 시도해주세요.");
  //   },
  // });
  // return { pointMutation };
};
