"use client";
import { useAddBookmark, useRemoveBookmark } from "@/app/_hooks/useMutations";
import { useFilterBookmark } from "@/app/_hooks/useQueries/bookmarks";
import { CircularProgress } from "@nextui-org/react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const Bookmark = ({
  action_id,
  user_uid,
}: {
  action_id: string;
  user_uid: string;
}) => {
  const { data: filterBookmark, isLoading } = useFilterBookmark(action_id);

  const addBookmarkMutation = useAddBookmark();
  const removeBookmarkMutation = useRemoveBookmark();

  const handleAddBookmarkClick = async (
    user_uid: string,
    action_id: string,
  ) => {
    if (user_uid !== null) {
      addBookmarkMutation.mutate({ user_uid, action_id });
    }
  };
  const handleRemoveBookmarkClick = async (action_id: string) => {
    removeBookmarkMutation.mutate(action_id);
  };

  const isBookmarked = filterBookmark?.filterBookmark?.find(
    (mark) => mark.user_uid === user_uid,
  );
  if (isLoading) {
    return <CircularProgress color="success" aria-label="Loading..." />;
  }

  return (
    <>
      {isBookmarked ? (
        <>
          <button onClick={() => handleRemoveBookmarkClick(action_id)}>
            <FaStar className="text-amber-300 text-xl" />
            <span>{filterBookmark?.filterBookmark?.length}</span>
          </button>
        </>
      ) : (
        <>
          <button onClick={() => handleAddBookmarkClick(user_uid, action_id)}>
            <CiStar className="text-xl" />
            <span>{filterBookmark?.filterBookmark?.length}</span>
          </button>
        </>
      )}
    </>
  );
};

export default Bookmark;

/* <>
  <button onClick={() => handleRemoveBookmarkClick(action_id)}>
    <FaStar className="text-amber-300" />
    <span>{mark.length}</span>
  </button>
</>
) : (
<>
  <button onClick={() => handleAddBookmarkClick(user_uid, action_id)}>
    <CiStar />
    <span>{data?.bookmarks?.length}</span>
  </button>
</> */
