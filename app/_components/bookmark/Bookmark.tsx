"use client";
import {
  useAddBookmark,
  useRemoveBookmark,
} from "@/app/_hooks/useMutations/bookmarks";
import { useFilterBookmark } from "@/app/_hooks/useQueries/bookmarks";
import { CircularProgress } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const Bookmark = ({ action_id }: { action_id: string }) => {
  const { data: filterBookmark, isLoading } = useFilterBookmark(action_id);

  const addBookmarkMutation = useAddBookmark();
  const removeBookmarkMutation = useRemoveBookmark();
  const session = useSession();
  const user_uid = session.data?.user.user_uid as string;

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
        <div className="flex gap-[5px] h-[20px] ">
          <button onClick={() => handleRemoveBookmarkClick(user_uid)}>
            <FaStar className="text-amber-300 text-[17px]  ml-[1.5px] mb-10 " />
            {/* mr-[3px] */}
          </button>
          <span>{filterBookmark?.filterBookmark?.length}</span>
        </div>
      ) : (
        <div className="flex gap-[3px] h-[20px] ">
          <button onClick={() => handleAddBookmarkClick(user_uid, action_id)}>
            <CiStar className="text-[20px] mb-20" />
          </button>
          <span>{filterBookmark?.filterBookmark?.length}</span>
        </div>
      )}
    </>
  );
};

export default Bookmark;
