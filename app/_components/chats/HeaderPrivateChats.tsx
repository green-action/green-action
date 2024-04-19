import React from "react";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY_MY_PRIVATE_ROOMS_IDS } from "@/app/_api/queryKeys";
import { getMyPrivateRoomInfos } from "@/app/_api/messages/headerPrivateList-api";
import { useSession } from "next-auth/react";

const HeaderPrivateChats = () => {
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";

  // data 타입
  // room_id: string;
  // participant_type: string;
  // chat_rooms_info: {
  //     action_id: string;
  //     room_type: string;

  // data - 채팅방 id, 참가자 type, action id, 채팅방 type
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY_MY_PRIVATE_ROOMS_IDS],
    queryFn: () => getMyPrivateRoomInfos(loggedInUserUid),
  });

  const actionIds = data?.map((item) => {
    return item.chat_rooms_info?.action_id;
  });

  // const {data:actionTitlesAndUrls, isLoading:IsActionLoading isError: IsActionError} = useQuery({
  //   queryKey: []
  // })

  if (isLoading) {
    <div>Loading</div>;
  }
  if (isError) {
    <div>Error</div>;
  }

  console.log("data", data);

  return <div>HeaderPrivateChats</div>;
};

export default HeaderPrivateChats;
