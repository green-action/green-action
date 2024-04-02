import { supabase } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";

const Bookmark = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: individualGreenActionsUid } = await supabase
    .from("individual_green_actions")
    .select("id");

  const user_uid = user?.user_metadata.user_uid;
  const action_id = individualGreenActionsUid;

  useEffect(() => {}, []);

  return (
    <>
      {/* {
    bookmark?.map((mark)=>{
      mark.action_id === action_id && mark.user_uid === user_uid ?
    })
  } */}
    </>
  );
};

export default Bookmark;
