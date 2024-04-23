import React from "react";
import HeaderGroupItem from "./HeaderGroupItem";
import { useGetMyGroupChatIds } from "@/app/_hooks/useQueries/chats";
import { useSession } from "next-auth/react";
import SoomLoaing from "/app/_assets/image/loading/SOOM_gif.gif";
import Image from "next/image";

const HeaderGroupList = () => {
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";

  const { roomIds, isRoomIdsLoading, isRoomIdsError } =
    useGetMyGroupChatIds(loggedInUserUid);

  if (isRoomIdsLoading) {
    return (
      <div className="w-[200px] h-auto mx-auto">
        <Image className="" src={SoomLoaing} alt="SoomLoading" />
      </div>
    );
  }

  if (isRoomIdsError) {
    return <div>Error</div>;
  }

  return (
    <>
      <HeaderGroupItem />
    </>
  );
};

export default HeaderGroupList;
