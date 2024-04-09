"use client";

import { useSession } from "next-auth/react";
import React, { useCallback } from "react";

import { useAddLike, useRemoveLike } from "@/app/_hooks/useMutations/bookmarks";
import { useFilterLikes } from "@/app/_hooks/useQueries/bookmarks";
import { debounce } from "@/utils/debounce/debounce";

import { CircularProgress } from "@nextui-org/react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

const Likes = ({ post_id }: { post_id: string }) => {
  const { data, isLoading } = useFilterLikes(post_id);
  const addLikeMutation = useAddLike();
  const removeLikeMutation = useRemoveLike();

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
          alert("로그인하고 이용해주세요");
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
    return <CircularProgress color="danger" aria-label="Loading..." />;
  }

  return (
    <>
      <button onClick={() => handleDebounce()}>
        {isLiked ? (
          <FaHeart className="hover:cursor-pointer text-rose-600 text-[15px]" />
        ) : (
          <CiHeart className="hover:cursor-pointer text-rose-600 text-[15px]" />
        )}
      </button>
      <span className="text-xs text-black">{data?.likes?.length ?? 0}</span>
    </>
  );
};

export default React.memo(Likes);
