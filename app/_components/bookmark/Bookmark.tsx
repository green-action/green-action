"use client";

import {
  MODE_DETAIL_PAGE,
  MODE_INDIVIDUAL_ACTION,
  MODE_MAIN,
  MODE_MY_BOOKMARKS,
  MODE_MY_POSTS,
} from "@/app/_api/constant";
import {
  useAddBookmark,
  useRemoveBookmark,
} from "@/app/_hooks/useMutations/bookmarks";
import { useFilterBookmark } from "@/app/_hooks/useQueries/bookmarks";
import { debounce } from "@/utils/debounce/debounce";
import { Skeleton } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { BsXCircle } from "react-icons/bs";
import AlertModal from "../community/AlertModal";
import CustomConfirm from "../customConfirm/CustomConfirm";
import bookmarkFill from "/app/_assets/image/individualAction/star_1.png";
import bookmarkEmpty from "/app/_assets/image/individualAction/star_2.png";

const Bookmark = ({
  action_id,
  mode,
}: {
  action_id: string;
  mode?: string;
}) => {
  const { data, isLoading, isError } = useFilterBookmark(action_id);

  const addBookmarkMutation = useAddBookmark(mode || "");
  const removeBookmarkMutation = useRemoveBookmark(mode || "");
  const session = useSession();
  const user_uid = session.data?.user.user_uid as string;

  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddBookmarkClick = useCallback(
    debounce(() => {
      if (user_uid === null || user_uid === undefined) {
        setMessage("로그인이 필요한 서비스입니다.");
        setIsOpenAlertModal(true);
        return;
      }
      if (user_uid !== null) {
        addBookmarkMutation.mutate({ user_uid, action_id });
      }
    }, 300),
    [user_uid, action_id, addBookmarkMutation],
  );
  const handleRemoveBookmarkClick = useCallback(
    debounce(() => {
      removeBookmarkMutation.mutate({ user_uid, action_id });
    }, 300),
    [user_uid, action_id, removeBookmarkMutation],
  );

  const isBookmarked = data?.filterBookmark?.find(
    (mark) => mark.user_uid === user_uid,
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Skeleton className="flex rounded-full w-12 h-12" />
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
      {isBookmarked ? (
        mode === MODE_MY_BOOKMARKS ? (
          <>
            <div className="flex">
              <CustomConfirm
                text="해당 Green Action을 북마크 목록에서 해제할까요?"
                mode={mode as string}
                okFunction={() =>
                  removeBookmarkMutation.mutate({ user_uid, action_id })
                }
              />
              <span>{data?.filterBookmark?.length}</span>
            </div>
          </>
        ) : (
          <div className="flex items-center">
            <button onClick={() => handleRemoveBookmarkClick()}>
              {mode === MODE_DETAIL_PAGE && (
                <Image
                  src={bookmarkFill}
                  alt="북마크"
                  className="size-[18px] desktop:w-[23px] desktop:h-[22px] laptop:size-[22px] mr-[6px]"
                />
              )}
              {mode === MODE_INDIVIDUAL_ACTION && (
                <Image
                  src={bookmarkFill}
                  alt="북마크"
                  className="desktop:w-[18px] desktop:h-[17px] mr-[3px] laptop:w-[16px] laptop:h-[15px] phone:size-[14px]"
                />
              )}
              {mode === MODE_MY_POSTS && (
                <Image
                  src={bookmarkFill}
                  alt="북마크"
                  className="desktop:size-[19px] desktop:mr-[4px] laptop:size-[17px] laptop:mr-[4px]"
                />
              )}
              {mode === MODE_MAIN && (
                <Image
                  src={bookmarkFill}
                  alt="북마크"
                  className="desktop:w-[18px] desktop:h-[17px] laptop:w-[17px] laptop:h-[16px] desktop:mt-[2px] laptop:mt-[0.5px] desktop:mr-[6px] laptop:mr-[5px] desktop:mb-[2px]  laptop:mb-[2px]"
                />
              )}
            </button>
            <span
              className={`desktop:text-sm laptop:text-[11px] 
               ${mode === MODE_DETAIL_PAGE && "laptop:text-[14px]"}
                ${
                  mode === MODE_MY_POSTS &&
                  "desktop:text-[12px] laptop:text-[11px] phone:text-[0px]"
                } ${
                mode === MODE_INDIVIDUAL_ACTION &&
                "phone:text-[11px] phone:text-[#848484] desktop:text-black laptop:text-black"
              }
              ${mode === MODE_MAIN && "laptop:mb-[1px] desktop:mt-[0.5px]"}
              `}
            >
              {data?.filterBookmark?.length ?? 0}
            </span>
          </div>
        )
      ) : (
        <div className="flex items-center">
          <button onClick={() => handleAddBookmarkClick()}>
            {mode === MODE_DETAIL_PAGE && (
              <Image
                src={bookmarkEmpty}
                alt="북마크"
                className="size-[18px] desktop:w-[22px] desktop:h-[21px] laptop:size-[21px] mr-[6px]"
              />
            )}
            {mode === MODE_INDIVIDUAL_ACTION && (
              <Image
                src={bookmarkEmpty}
                alt="북마크"
                className="desktop:w-[17px] desktop:h-[16px] mr-[6px] laptop:w-[15px] laptop:h-[14px] phone:w-[14px] phone:h-[13px]"
              />
            )}
            {mode === MODE_MY_POSTS && (
              <Image
                src={bookmarkEmpty}
                alt="북마크"
                className="desktop:size-[17px] desktop:h-[16px] desktop:mr-[6px] laptop:w-[16px] laptop:h-[15px] laptop:mr-[5px] phone:size-[17px]"
              />
            )}
            {mode === MODE_MAIN && (
              <Image
                src={bookmarkEmpty}
                alt="북마크"
                className="desktop:w-[18px] desktop:h-[17px] laptop:w-[16px] laptop:h-[15px] desktop:mt-[2px] laptop:mt-[1px] desktop:mr-[6px] laptop:mr-[5px] desktop:mb-[2px]  laptop:mb-[2px]"
              />
            )}
          </button>
          <span
            className={`desktop:text-sm laptop:text-[11px] 
              ${mode === MODE_DETAIL_PAGE && "laptop:text-[14px]"}
              ${
                mode === MODE_MY_POSTS &&
                "desktop:text-[12px] laptop:text-[11px] phone:text-[0px]"
              } ${
              mode === MODE_INDIVIDUAL_ACTION &&
              "phone:text-[11px] phone:text-[#848484] desktop:text-black laptop:text-black"
            }
             ${mode === MODE_MAIN && "desktop:mb-[1px] laptop:mb-[1px]"}`}
          >
            {data?.filterBookmark?.length ?? 0}
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
