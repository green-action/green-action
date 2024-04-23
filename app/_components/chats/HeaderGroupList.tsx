import React from "react";
import HeaderGroupItem from "./HeaderGroupItem";
import {
  useGetGroupListActionsInfo,
  useGetMyGroupChatIds,
} from "@/app/_hooks/useQueries/chats";
import { useSession } from "next-auth/react";
import SoomLoaing from "/app/_assets/image/loading/SOOM_gif.gif";
import Image from "next/image";

const HeaderGroupList = () => {
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";

  const { roomIds, isRoomIdsLoading, isRoomIdsError } =
    useGetMyGroupChatIds(loggedInUserUid);

  const { actionsInfo, isActionsInfoLoading, isActionsInfoError } =
    useGetGroupListActionsInfo(roomIds);

  if (isRoomIdsLoading || isActionsInfoLoading) {
    return (
      <div className="w-[200px] h-auto mx-auto">
        <Image className="" src={SoomLoaing} alt="SoomLoading" />
      </div>
    );
  }

  if (isRoomIdsError || isActionsInfoError) {
    return <div>Error</div>;
  }

  console.log("actionsInfo", actionsInfo);

  return (
    <>
      <HeaderGroupItem />
    </>
  );
};

export default HeaderGroupList;
