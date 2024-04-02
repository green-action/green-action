"use client";
import { supabase } from "@/utils/supabase/client";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";

const Bookmark = async ({ action_id }: { action_id: string }) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: bookmarks, error } = await supabase.from("bookmarks").select("*");

  const user_uid = user?.user_metadata.user_uid;
  // 클릭시 user_uid추가 action_id추가
  //  action_id받아서 table안에 action_id랑 일치 여부?
  // 상태에 따른 랜더링
  const handleAddBookmarkClick = async (
    user_uid: string,
    action_id: string,
  ) => {
    if (user_uid !== null) {
      const { data, error } = await supabase
        .from("bookmarks")
        .insert([{ user_uid, action_id }])
        .select();
    }
  };
  const handleRemoveBookmarkClick = async (action_id: string) => {
    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq(action_id, action_id);
  };

  return (
    <>
      {bookmarks?.map((mark) => {
        {
          mark.action_id === action_id ? (
            <>
              <button onClick={() => handleRemoveBookmarkClick(action_id)}>
                <FaStar className="text-amber-300" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleAddBookmarkClick(user_uid, action_id)}
              >
                <CiStar />
              </button>
            </>
          );
        }
      })}
    </>
  );
};

export default Bookmark;
