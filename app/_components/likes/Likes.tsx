"use client";
import { useAddLike, useRemoveLike } from "@/app/_hooks/useMutations/bookmarks";
import { useFilterLikes } from "@/app/_hooks/useQueries/bookmarks";
import { CircularProgress } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

const Likes = ({ post_id }: { post_id: string }) => {
  const { data, isLoading } = useFilterLikes(post_id);
  const addLikeMutation = useAddLike();
  const removeLikeMutation = useRemoveLike();

  const session = useSession();
  const user_uid = session.data?.user.user_uid as string;

  const handleAddLikeClick = (user_uid: string, post_id: string) => {
    if (user_uid === null || user_uid === undefined) {
      return;
    }
    if (user_uid !== null) {
      addLikeMutation.mutate({ user_uid, post_id });
    }
  };

  const handleRemoveLikeClick = (user_uid: string) => {
    removeLikeMutation.mutate({ user_uid, post_id });
  };

  const getLength = (likeLength: number | undefined) => {
    if (likeLength === null || likeLength === undefined) {
      return (likeLength = 0);
    }
    return likeLength;
  };

  const isLiked = data?.likes?.find((like) => like.user_uid === user_uid);

  if (isLoading) {
    return <CircularProgress color="danger" aria-label="Loading..." />;
  }

  return (
    <>
      {isLiked ? (
        <>
          <button onClick={() => handleRemoveLikeClick(user_uid)}>
            <FaHeart className="hover:cursor-pointer text-rose-600 text-[15px]" />
          </button>
          <span className="text-xs text-black">
            {getLength(data?.likes?.length)}
          </span>
        </>
      ) : (
        <>
          <button onClick={() => handleAddLikeClick(user_uid, post_id)}>
            <CiHeart className="hover:cursor-pointer text-rose-600 text-[15px]" />
          </button>
          <span className="text-xs text-black">
            {getLength(data?.likes?.length)}
          </span>
        </>
      )}
    </>
  );
};

export default Likes;
