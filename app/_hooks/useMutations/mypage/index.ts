import { updateMyIntro } from "@/app/_api/mypage/mypage-api";
import { QUERY_KEY_USER } from "@/app/_api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// 마이페이지 자기소개 수정
export const useEditIntro = (editedIntro: string) => {
  const queryClient = useQueryClient();
    const {mutate: editIntroMutate }
} = useMutation({
    mutationFn: () => updateMyIntro(editedIntro),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_USER] });
    },
  });
  return editIntroMutate;
};
