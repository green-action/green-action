"use client";
import React, { useCallback } from "react";

import {
  useAddBookmark,
  useRemoveBookmark,
} from "@/app/_hooks/useMutations/bookmarks";
import { useFilterBookmark } from "@/app/_hooks/useQueries/bookmarks";
import { debounce } from "@/utils/debounce/debounce";

import CustomConfirm from "../customConfirm/CustomConfirm";

import { useSession } from "next-auth/react";

import { CircularProgress } from "@nextui-org/react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import bookmarkFill from "/app/_assets/image/logo_icon/icon/mypage/Star 32.png";
import bookmarkEmpty from "/app/_assets/image/logo_icon/icon/mypage/Star 31.png";
import Image from "next/image";

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

  const handleAddBookmarkClick = useCallback(
    debounce(() => {
      if (user_uid === null || user_uid === undefined) {
        alert("로그인하고 이용해주세요");
        return;
      }
      if (user_uid !== null) {
        addBookmarkMutation.mutate({ user_uid, action_id });
      }
    }, 1000),
    [user_uid, action_id, addBookmarkMutation],
  );
  const handleRemoveBookmarkClick = useCallback(
    debounce(() => {
      removeBookmarkMutation.mutate({ user_uid, action_id });
    }, 1000),
    [user_uid, action_id, removeBookmarkMutation],
  );

  const isBookmarked = filterBookmark?.filterBookmark?.find(
    (mark) => mark.user_uid === user_uid,
  );

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
            <div className="flex">
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
          <div className="flex">
            <button onClick={() => handleRemoveBookmarkClick()}>
              {mode === "detailPage" && (
                <Image
                  src={bookmarkFill}
                  alt="북마크"
                  className="size-[22px] mr-[6px]"
                />
              )}
              {mode === "individualAction" && (
                <Image
                  src={bookmarkFill}
                  alt="북마크"
                  className="size-[16px] mr-[6px]"
                />
              )}
            </button>
            <span>{filterBookmark?.filterBookmark?.length ?? 0}</span>
          </div>
        )
      ) : (
        // isBookmarked - false
        <div className="flex">
          <button onClick={() => handleAddBookmarkClick()}>
            {mode === "detailPage" && (
              <Image
                src={bookmarkEmpty}
                alt="북마크"
                className="size-[22px] mr-[6px]"
              />
            )}
            {mode === "individualAction" && (
              <Image
                src={bookmarkEmpty}
                alt="북마크"
                className="size-[16px] mr-[6px]"
              />
            )}
            {/* <CiStar className="text-[19px]" /> */}
          </button>
          <span>{filterBookmark?.filterBookmark?.length ?? 0}</span>
        </div>
      )}
    </>
  );
};

export default React.memo(Bookmark);
