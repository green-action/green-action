"use client";
import {
  useAddBookmark,
  useRemoveBookmark,
} from "@/app/_hooks/useMutations/bookmarks";
import { useFilterBookmark } from "@/app/_hooks/useQueries/bookmarks";
import { useQueryUser } from "@/app/_hooks/useQueries/user";
import { CircularProgress } from "@nextui-org/react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const Bookmark = ({ action_id }: { action_id: string }) => {
  const { data: filterBookmark, isLoading } = useFilterBookmark(action_id);

  const addBookmarkMutation = useAddBookmark();
  const removeBookmarkMutation = useRemoveBookmark();
  const { data: users } = useQueryUser();
  const user_uid = users?.user?.user_metadata.sub;

  const handleAddBookmarkClick = async (
    user_uid: string,
    action_id: string,
  ) => {
    if (user_uid === null || user_uid === undefined) {
      return;
    }
    if (user_uid !== null) {
      addBookmarkMutation.mutate({ user_uid, action_id });
    }
  };
  const handleRemoveBookmarkClick = async (user_uid: string) => {
    removeBookmarkMutation.mutate(user_uid);
  };

  const isBookmarked = filterBookmark?.filterBookmark?.find(
    (mark) => mark.user_uid === user_uid,
  );
  if (isLoading) {
    return <CircularProgress color="warning" aria-label="Loading..." />;
  }

  return (
    <>
      {isBookmarked ? (
        <>
          <button onClick={() => handleRemoveBookmarkClick(user_uid)}>
            <FaStar className="text-amber-300 text-xl" />
          </button>
          <span>{filterBookmark?.filterBookmark?.length}</span>
        </>
      ) : (
        <>
          <button onClick={() => handleAddBookmarkClick(user_uid, action_id)}>
            <CiStar className="text-xl" />
          </button>
          <span>{filterBookmark?.filterBookmark?.length}</span>
        </>
      )}
    </>
  );
};

export default Bookmark;
