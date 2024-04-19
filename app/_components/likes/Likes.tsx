"use client";

import { useSession } from "next-auth/react";
import React, { useCallback, useState } from "react";

import { useAddLike, useRemoveLike } from "@/app/_hooks/useMutations/bookmarks";
import { useFilterLikes } from "@/app/_hooks/useQueries/bookmarks";

import { debounce } from "@/utils/debounce/debounce";

import { GoHeart, GoHeartFill } from "react-icons/go";

import { Skeleton } from "@nextui-org/react";
import AlertModal from "../community/AlertModal";

// import Image from "next/image";
// import heart from "../../../app/_assets/image/logo_icon/icon/community/Group 130.png";
// import emptyHeart from "../../../app/_assets/image/logo_icon/icon/community/Group 83.png";

const Likes = ({ post_id, isOpen }: { post_id: string; isOpen: boolean }) => {
  const { data, isLoading } = useFilterLikes(post_id);
  const addLikeMutation = useAddLike();
  const removeLikeMutation = useRemoveLike();

  // alert 대체 모달창을 위한 상태관리
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const [message, setMessage] = useState("");

  const session = useSession();
  const user_uid = session.data?.user.user_uid as string;

  const handleToggle = () => {
    const isLiked = data?.likes?.find((like) => like.user_uid === user_uid);
    if (isLiked) {
      return () => {
        removeLikeMutation.mutate({ user_uid, post_id });
      };
    } else {
      return () => {
        if (user_uid === null || user_uid === undefined) {
          // alert("로그인하고 이용해주세요");
          setMessage("로그인이 필요한 서비스입니다.");
          setIsOpenAlertModal(true);
          return;
        }
        if (user_uid !== null) {
          addLikeMutation.mutate({ user_uid, post_id });
        }
      };
    }
  };

  const isLiked = data?.likes?.find((like) => like.user_uid === user_uid);

  const handleDebounce = useCallback(debounce(handleToggle(), 1000), [isLiked]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-[60px] h-auto">
        <Skeleton className="flex rounded-full w-12 h-12" />
      </div>
    );
  }

  return (
    <>
      <button onClick={() => handleDebounce()}>
        {isLiked ? (
          // 아이콘 이미지 - 이미지가 흰색밖에 없어서 리액트 아이콘으로 수정

          // <Image
          //   src={heart}
          //   alt="Liked heart"
          //   className="hover:cursor-pointer w-[18px] h-[16px]"
          // />
          <GoHeartFill className="size-[18px]" />
        ) : (
          // <Image
          //   src={emptyHeart}
          //   alt="Liked heart"
          //   className="hover:cursor-pointer w-[18px] h-[16px]"
          // />
          <GoHeart className="size-[18px]" />
        )}
      </button>
      <span className={`text-[16px] ${isOpen ? `text-black` : `text-white`} `}>
        {data?.likes?.length ?? 0}
      </span>
      {isOpenAlertModal && (
        <AlertModal
          isOpen={isOpenAlertModal}
          onClose={() => setIsOpenAlertModal(false)}
          message={message}
        />
      )}
    </>
  );
};

export default React.memo(Likes);
