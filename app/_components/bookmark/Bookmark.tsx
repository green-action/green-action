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
import CustomConfirm from "../customConfirm/CustomConfirm";

const Bookmark = ({
  action_id,
  mode,
}: {
  action_id: string;
  mode?: string;
  // mode는 없어도 되는 인자
}) => {
  const { data: filterBookmark, isLoading } = useFilterBookmark(action_id);

  const addBookmarkMutation = useAddBookmark(mode || "");
  const removeBookmarkMutation = useRemoveBookmark(mode || "");
  const session = useSession();
  const user_uid = session.data?.user.user_uid as string;

  const handleAddBookmarkClick = async () => {
    if (user_uid === null || user_uid === undefined) {
      return;
    }
    if (user_uid !== null) {
      addBookmarkMutation.mutate({ user_uid, action_id });
    }
  };
  const handleRemoveBookmarkClick = async () => {
    removeBookmarkMutation.mutate({ user_uid, action_id });
  };

  const isBookmarked = filterBookmark?.filterBookmark?.find(
    (mark) => mark.user_uid === user_uid,
  );
  const handleToggle = () => {
    const isBookmarked = filterBookmark?.filterBookmark?.find(
      (mark) => mark.user_uid === user_uid,
    );
    return isBookmarked
      ? handleRemoveBookmarkClick()
      : handleAddBookmarkClick();
  };
  if (isLoading) {
    return <CircularProgress color="warning" aria-label="Loading..." />;
  }

  return (
    <>
      {/* 이중 삼항 연산자 */}
      {/* 북마크된 상태일 때 */}
      {isBookmarked ? (
        mode === "myBookmarks" ? (
          <>
            {/* isBookmarked - true 이면서 mode === "myBookmarks" 인 경우 Custom Confirm 창으로 연결*/}
            <div className="flex gap-[5px] h-[20px]">
              <CustomConfirm
                text="해당 Green Action을 북마크 목록에서 해제할까요?"
                mode={mode as string}
                okFunction={() =>
                  removeBookmarkMutation.mutate({ user_uid, action_id })
                }
              />
              <span>{filterBookmark?.filterBookmark?.length}</span>
            </div>
          </>
        ) : (
          // isBookmarked - true 이지만 mode !== "myBookmarks"인 경우
          <div className="flex gap-[5px] h-[20px]">
            <button onClick={() => handleRemoveBookmarkClick()}>
              <FaStar className="text-amber-300 text-[17px]  ml-[1.5px] mb-10 " />
              {/* mr-[3px] */}
            </button>
            <span>{filterBookmark?.filterBookmark?.length ?? 0}</span>
          </div>
        )
      ) : (
        // isBookmarked - false
        <div className="flex gap-[3px] h-[10px]">
          <button onClick={() => handleAddBookmarkClick()}>
            <CiStar className="text-[19px]" />
          </button>
          <span>{filterBookmark?.filterBookmark?.length ?? 0}</span>
        </div>
      )}
    </>
  );
};

export default Bookmark;
