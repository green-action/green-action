import {
  deleteMyAction,
  updateActionRecruiting,
} from "@/app/_api/mypage/mypage-list-api";
import {
  insertProfileImgUrl,
  updateUserIntro,
  updateUserName,
  uploadProfileImgFileAndInsertIntoTable,
} from "@/app/_api/mypage/mypage-profile-api";
import {
  QUERY_KEY_MY_BOOKMARK,
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
      console.error(Error);
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
      console.error(Error);
    },
  });

  const updateIntro = async () => {
    mutate();
  };

  return { updateIntro };
};

// 마이페이지 프로필 이미지 수정 - 이미지 업로드 시
export const useUpdateUserProfileImg = (
  user_uid: string,
  file: File | undefined,
) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () =>
      uploadProfileImgFileAndInsertIntoTable({ user_uid, file }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_USER_INFO] });
    },
    onError: () => {
      alert("처리에 오류가 발생했습니다. 다시 시도해주세요.");
      console.error(Error);
    },
  });

  const updateProfileImg = async () => {
    mutate();
  };

  return { updateProfileImg };
};

// 마이페이지 프로필 이미지 수정(삭제) - 이미지 업로드 없이 미리보기 사진 삭제 시 (프로필 이미지 초기화)
export const useRemoveUserProfileImg = (user_uid: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => insertProfileImgUrl({ user_uid, imgUrl: "" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_USER_INFO] });
    },
    onError: () => {
      alert("처리에 오류가 발생했습니다. 다시 시도해주세요.");
      console.error(Error);
    },
  });

  const removeProfileImg = async () => {
    mutate();
  };

  return { removeProfileImg };
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
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_MY_BOOKMARK],
      });
    },
    onError: () => {
      alert("처리에 오류가 발생했습니다. 다시 시도해주세요.");
      console.error(Error);
    },
  });

  const updateRecruiting = async () => {
    mutate();
  };

  return { updateRecruiting };
};

// 마이페이지 My Green Action 삭제
export const useDeleteAction = (action_id: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => deleteMyAction(action_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_MY_INDIVIDUALACTION],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_MY_BOOKMARK],
      });
    },
    onError: () => {
      alert("처리에 오류가 발생했습니다. 다시 시도해주세요.");
      console.error(Error);
    },
  });

  const deleteAction = async () => {
    mutate();
  };

  return { deleteAction };
};
