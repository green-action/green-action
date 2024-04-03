"use client";
import { useAddBookmark, useRemoveBookmark } from "@/app/_hooks/useMutations";
import { useBookmark } from "@/app/_hooks/useQueries/bookmarks";
import { useAuthStore } from "@/app/_store/authStore";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";

const Bookmark = ({ action_id }: { action_id: string }) => {
  const { data, isLoading } = useBookmark();
  // const { data: user } = useQueryUser();

  const { user } = useAuthStore();
  const userUid = user?.sub || "";

  // const user_uid = user?.user_metadata.user_uid;
  const user_uid = "6f971b1e-abaf-49d5-90e7-f8c6bfe4bd58";

  const addBookmarkMutation = useAddBookmark();
  const removeBookmarkMutation = useRemoveBookmark();

  // 클릭시 user_uid;추가 action_id추가
  //  action_id받아서 table안에 action_id랑 일치 여부?
  // 상태에 따른 랜더링
  const handleAddBookmarkClick = async (
    user_uid: string,
    action_id: string,
  ) => {
    // if (user_uid !== null) {
    //   const { data, error } = await supabase
    //     .from("bookmarks")
    //     .insert([{ user_uid, action_id }])
    //     .select();
    // }
    if (user_uid !== null) {
      // addBookmarkMutation.mutate({ user_uid, action_id });
    }
  };
  const handleRemoveBookmarkClick = async (action_id: string) => {
    removeBookmarkMutation.mutate(action_id);
  };

  return (
    <>
      {data?.bookmarks?.map((mark) => {
        mark.action_id === action_id ? (
          <>
            <button onClick={() => handleRemoveBookmarkClick(action_id)}>
              <FaStar className="text-amber-300" />
            </button>
          </>
        ) : (
          <>
            <button onClick={() => handleAddBookmarkClick(user_uid, action_id)}>
              <CiStar />
            </button>
          </>
        );
      })}
    </>
  );
};

export default Bookmark;
