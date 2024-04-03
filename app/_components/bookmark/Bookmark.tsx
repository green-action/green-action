"use client";
import { useAddBookmark, useRemoveBookmark } from "@/app/_hooks/useMutations";
import {
  useFilterBookmark,
  useQueryUser,
} from "@/app/_hooks/useQueries/bookmarks";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const Bookmark = ({ action_id }: { action_id: string }) => {
  const { data: user } = useQueryUser();
  const { data: filterBookmark, isLoading } = useFilterBookmark(action_id);

  // const { sub: user_uid } = user?.user_metadata;
  const user_uid = "6f971b1e-abaf-49d5-90e7-f8c6bfe4bd58";

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

  return (
    <>
      {isBookmarked ? (
        <>
          <button onClick={() => handleRemoveBookmarkClick(action_id)}>
            <FaStar className="text-amber-300" />
            <span>{filterBookmark?.filterBookmark?.length}</span>
          </button>
        </>
      ) : (
        <>
          <button onClick={() => handleAddBookmarkClick(user_uid, action_id)}>
            <CiStar />
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
