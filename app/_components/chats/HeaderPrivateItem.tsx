import { MODE_TODAY } from "@/app/_api/constant";
import { useResponsive } from "@/app/_hooks/responsive";
import { useGetUnreadCount } from "@/app/_hooks/useQueries/chats";
import { previousFormatDate, todayFormatTime } from "@/utils/date/date";
import { Avatar, useDisclosure } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import PrivateChatRoom from "./PrivateChatRoom";
import SoomLoaing from "/app/_assets/image/loading/SOOM_gif.gif";

// TODO any 타입 해결 필요
const HeaderPrivateItem = ({
  eachRoomInfo,
  mode,
}: {
  eachRoomInfo: any;
  mode: string;
}) => {
  // 현재 로그인한 유저 uid
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid || "";
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  // 1:1 채팅방 모달창
  const {
    isOpen: isPrivateChatOpen,
    onOpen: onPrivateChatOpen,
    onClose: onPrivateChatClose,
    onOpenChange: onPrivateChatOpenChange,
  } = useDisclosure();

  // console.log("eachRoomInfo", eachRoomInfo);

  const room_id = eachRoomInfo?.chat_rooms_info.room_id;
  const action_id = eachRoomInfo?.action_info.action_id;

  // 안읽은 메시지 수 가져오기
  const { unreadCount, isLoading, isError } = useGetUnreadCount({
    loggedInUserUid,
    room_id,
  });

  if (isLoading) {
    return (
      <div className="w-[200px] h-auto mx-auto">
        <Image className="" src={SoomLoaing} alt="SoomLoading" />
      </div>
    );
  }

  if (isError || unreadCount === undefined) {
    return <div>Error</div>;
  }

  return (
    <div
      key={room_id}
      className={`flex flex-col bg-white cursor-pointer rounded-2xl ${
        isDesktop
          ? "mb-6 px-9 py-8"
          : isLaptop
          ? "mb-4 px-7 py-5"
          : isMobile && "mb-3 px-4 py-2"
      }`}
      onClick={() => {
        onPrivateChatOpen();
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <Avatar
            showFallback
            src={eachRoomInfo.message.user.profile_img}
            alt="defaultImg"
            className={`${
              isDesktop
                ? "w-[65px] h-[65px] mr-7"
                : isLaptop
                ? "w-[50px] h-[50px] mr-4"
                : isMobile && "w-[30px] h-[30px] mr-3"
            }`}
          />
        </div>
        <div
          className={`flex flex-col w-full ${
            isDesktop ? "gap-2" : isLaptop ? "gap-1" : isMobile && "gap-1"
          }`}
        >
          <div className="flex justify-between">
            <div>
              <span
                className={`font-black ${
                  isDesktop
                    ? "text-xl"
                    : isLaptop
                    ? "text-sm"
                    : isMobile && "text-xs"
                }`}
              >
                {eachRoomInfo.message.user.display_name}
              </span>
            </div>
            <div
              className={`flex items-center ${
                isDesktop ? "gap-2" : isLaptop ? "gap-2" : isMobile && "gap-1"
              }`}
            >
              <p
                className={`bg-[#7B7B7B] rounded-xl text-white ${
                  isDesktop
                    ? "px-3"
                    : isLaptop
                    ? "text-xs px-2"
                    : isMobile && "text-[10px] px-1"
                }`}
              >
                {eachRoomInfo.chat_rooms_info.participant_type === "방장" &&
                  "My"}
              </p>
              <span
                className={`text-[#7B7B7B] font-black overflow-hidden whitespace-nowrap overflow-ellipsis ${
                  isDesktop
                    ? "text-lg max-w-[170px]"
                    : isLaptop
                    ? "text-sm max-w-[90px]"
                    : isMobile && "text-xs max-w-[78px]"
                }`}
              >
                {eachRoomInfo.action_info.action_title}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <div
              className={`text-gray-500 overflow-hidden whitespace-nowrap overflow-ellipsis ${
                isDesktop
                  ? "max-w-[170px]"
                  : isLaptop
                  ? "max-w-[130px] text-sm"
                  : isMobile && "max-w-[120px] text-xs"
              }`}
            >
              {eachRoomInfo.message.content}
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-gray-500 ${
                  isLaptop ? "text-sm" : isMobile && "text-xs"
                }`}
              >
                {mode === MODE_TODAY
                  ? todayFormatTime(eachRoomInfo.message.created_at)
                  : previousFormatDate(eachRoomInfo.message.created_at)}
              </span>
              {unreadCount > 0 && (
                <div
                  className={`bg-[#B3C8A1] ml-1 rounded-full text-white font-extrabold flex justify-center items-center ${
                    isDesktop
                      ? "w-7 h-7"
                      : isLaptop
                      ? "w-6 h-6 text-sm"
                      : isMobile && "w-4 h-4 text-xs"
                  }`}
                >
                  {unreadCount}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isPrivateChatOpen && (
        <PrivateChatRoom
          isOpen={isPrivateChatOpen}
          onOpenChange={onPrivateChatOpenChange}
          onPrivateChatClose={onPrivateChatClose}
          roomId={room_id}
          actionId={action_id}
        />
      )}
    </div>
  );
};

export default HeaderPrivateItem;
