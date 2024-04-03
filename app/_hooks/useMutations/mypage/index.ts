import { updateUserIntro, updateUserName } from "@/app/_api/mypage/mypage-api";
import { QUERY_KEY_USER_INFO } from "@/app/_api/queryKeys";
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
