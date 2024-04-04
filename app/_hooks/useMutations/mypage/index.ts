import {
  updateActionRecruiting,
  updateUserIntro,
  updateUserName,
} from "@/app/_api/mypage/mypage-api";
import {
  QUERY_KEY_MY_INDIVIDUALACTION,
  QUERY_KEY_USER_INFO,
} from "@/app/_api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// 마이페이지 닉네임 수정
export const useUpdateUserName = (user_uid: string, editedName: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => updateUserName(user_uid, editedName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_USER_INFO] });
    },
    onError: () => {
      alert("처리에 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  const updateName = async () => {
    mutate();
  };

  return { updateName };
};

// 마이페이지 자기소개 수정
export const useUpdateUserIntro = (user_uid: string, editedIntro: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => updateUserIntro(user_uid, editedIntro),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_USER_INFO] });
    },
    onError: () => {
      alert("처리에 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  const updateIntro = async () => {
    mutate();
  };

  return { updateIntro };
};

// 마이페이지 My Green Action의 모집상태 (중 -> 마감) 변경
export const useUpdateActionRecruiting = (action_id: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => updateActionRecruiting(action_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_MY_INDIVIDUALACTION],
      });
    },
    onError: () => {
      alert("처리에 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  const updateRecruiting = async () => {
    mutate();
  };

  return { updateRecruiting };
};
