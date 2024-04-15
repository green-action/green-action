"use client";
import React, { useCallback, useState } from "react";

import {
  useAddBookmark,
  useRemoveBookmark,
} from "@/app/_hooks/useMutations/bookmarks";
import { useFilterBookmark } from "@/app/_hooks/useQueries/bookmarks";
import { debounce } from "@/utils/debounce/debounce";

import CustomConfirm from "../customConfirm/CustomConfirm";

import { useSession } from "next-auth/react";

import Image from "next/image";
import SoomLoaing from "/app/_assets/image/loading/SOOM_gif.gif";
import bookmarkEmpty from "/app/_assets/image/logo_icon/icon/mypage/Star 31.png";
import bookmarkFill from "/app/_assets/image/logo_icon/icon/mypage/Star 32.png";
import AlertModal from "../community/AlertModal";

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

  // alert 대체 모달창을 위한 상태관리
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddBookmarkClick = useCallback(
    debounce(() => {
      if (user_uid === null || user_uid === undefined) {
        // alert("로그인하고 이용해주세요");
        setMessage("로그인이 필요한 서비스입니다.");
        setIsOpenAlertModal(true);
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
    return (
      <div className="flex justify-center items-center w-[60px] h-auto">
        <Image src={SoomLoaing} alt="SoomLoading" />
      </div>
    );
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
          <div className="flex items-center">
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
                  className="size-[16px] desktop:size-[16px] mr-[6px] laptop:size-[13px]"
                />
              )}
              {mode === "myPosts" && (
                <Image
                  src={bookmarkFill}
                  alt="북마크"
                  className="desktop:w-[15px] laptop:w-[14px] desktop:h-[14px] laptop:h-[13px] desktop:mt-[3px] laptop:mt-[2px] desktop:mr-[8px] laptop:mr-[4px] mb-[2px]"
                />
              )}
              {mode === "main" && (
                <Image
                  src={bookmarkFill}
                  alt="북마크"
                  className="desktop:w-[15px] laptop:w-[13px] desktop:h-[14px] laptop:h-[12px] desktop:mt-[2px] desktop:mr-[6px] laptop:mr-[8px] desktop:mb-[2px]"
                />
              )}
            </button>
            <span
              className={`desktop:text-sm laptop:text-[11px] ${
                mode === "myPosts" && "desktop:text-[12px] laptop:text-[11px]"
              }`}
            >
              {filterBookmark?.filterBookmark?.length ?? 0}
            </span>
          </div>
        )
      ) : (
        // isBookmarked - false
        <div className="flex items-center">
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
                className="size-[16px] desktop:size-[16px] mr-[6px] laptop:size-[13px] "
              />
            )}
            {mode === "myPosts" && (
              <Image
                src={bookmarkEmpty}
                alt="북마크"
                className="desktop:w-[15px] laptop:w-[15px] desktop:h-[14px] laptop:h-[13px] desktop:mt-[4px] laptop:mt-[2px] desktop:mr-[5px] laptop:mr-[3px] mb-[2px]"
              />
            )}
            {mode === "main" && (
              <Image
                src={bookmarkEmpty}
                alt="북마크"
                className="desktop:w-[15px] laptop:w-[13px] desktop:h-[14px] laptop:h-[12px] desktop:mt-[2px] laptop:mt-[2px] desktop:mr-[6px] laptop:mr-[8px] desktop:mb-[2px]  laptop:mb-[2px]"
              />
            )}
            {/* <CiStar className="text-[19px]" /> */}
          </button>
          <span
            className={`desktop:text-sm laptop:text-[11px] ${
              mode === "myPosts" && "desktop:text-[12px] laptop:text-[11px]"
            }`}
          >
            {filterBookmark?.filterBookmark?.length ?? 0}
          </span>
        </div>
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

export default React.memo(Bookmark);
