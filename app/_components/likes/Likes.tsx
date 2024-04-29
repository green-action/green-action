"use client";

import {
  MODE_MAIN_DESKTOP,
  MODE_MAIN_DESKTOP_COUNT,
  MODE_MAIN_LAPTOP,
  MODE_MAIN_LAPTOP_COUNT,
  MODE_MOBILE,
} from "@/app/_api/constant";
import { useAddLike, useRemoveLike } from "@/app/_hooks/useMutations/bookmarks";
import { useFilterLikes } from "@/app/_hooks/useQueries/bookmarks";
import { debounce } from "@/utils/debounce/debounce";
import { Skeleton } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React, { useCallback, useState } from "react";
import { BsXCircle } from "react-icons/bs";
import { GoHeart, GoHeartFill } from "react-icons/go";
import AlertModal from "../community/AlertModal";

import type { likesProps } from "@/app/_types/bookmark";

const Likes: React.FC<likesProps> = ({ post_id, isOpen, mode }) => {
  const { data, isLoading, isError } = useFilterLikes(post_id);
  const addLikeMutation = useAddLike();
  const removeLikeMutation = useRemoveLike();

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

  const handleDebounce = useCallback(debounce(handleToggle(), 300), [isLiked]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Skeleton className="flex rounded-full w-12 h-12 phone:w-[18px] phone:h-[18px]" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center">
        <BsXCircle />
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => handleDebounce()}
        className={`${mode === MODE_MAIN_LAPTOP && "ml-[20px]"} ${
          (mode === MODE_MAIN_DESKTOP_COUNT ||
            mode === MODE_MAIN_LAPTOP_COUNT) &&
          "hidden"
        }`}
      >
        {isLiked ? (
          <GoHeartFill
            className={`size-[18px] ${
              mode === MODE_MAIN_DESKTOP && "size-[30px]"
            } ${mode === MODE_MAIN_LAPTOP && "size-[20px]"}`}
          />
        ) : (
          <GoHeart
            className={`size-[18px] ${
              mode === MODE_MAIN_DESKTOP && "size-[30px]"
            } ${mode === MODE_MAIN_LAPTOP && "size-[20px]"}`}
          />
        )}
      </button>
      {mode !== MODE_MOBILE &&
        mode !== MODE_MAIN_DESKTOP &&
        mode !== MODE_MAIN_LAPTOP && (
          <span
            className={` ${mode !== MODE_MAIN_LAPTOP_COUNT && "text-[16px]"} 
            ${isOpen ? `text-black` : `text-white`} 
              ${mode === MODE_MAIN_DESKTOP_COUNT && `text-black`} 
              ${mode === MODE_MAIN_LAPTOP_COUNT && `text-[13px] mb-1`}`}
          >
            {data?.likes?.length ?? 0}
          </span>
        )}

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
