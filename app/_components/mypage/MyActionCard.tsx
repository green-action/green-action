import { useRouter } from "next/navigation";
import Image from "next/image";

import Bookmark from "../bookmark/Bookmark";
import MyActionRecruitingModal from "./MyActionRecruitingModal";

import { useDeleteAction } from "@/app/_hooks/useMutations/mypage";

import {
  Button,
  Card,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";

import { GrLocation } from "react-icons/gr";
import { IoIosCalendar } from "react-icons/io";

import person from "/app/_assets/image/logo_icon/icon/mypage/image 166.png";
import optionDots from "/app/_assets/image/logo_icon/icon/mypage/Group 100.png";

// TODO MyAction 타입 사용 후 에러 해결하기
const MyActionCard = ({ action, mode }: { action: any; mode: string }) => {
  const router = useRouter();
  const {
    isOpen,
    onOpen: handleModalOpen,
    onClose,
    onOpenChange,
  } = useDisclosure();

  const {
    id,
    title,
    is_recruiting,
    actionImgUrls,
    recruit_number,
    start_date,
    end_date,
    location,
    // actionBookmarks,
  } = mode === "myBookmarks" ? action.bookmarkedAction : action;

  const actionImgUrl = actionImgUrls[0]; // as string || ''

  const { deleteAction } = useDeleteAction(id);

  const handleActionClick = () => router.push(`/individualAction/detail/${id}`);

  const handleEditClick = () => {
    router.push(`/individualAction/edit/${id}`);
  };

  const handleDeleteClick = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteAction();
    } else return;
  };

  return (
    <div key={id}>
      <div className="none desktop:w-[356px] laptop:w-[330px] desktop:h-[25rem] laptop:h-[415px] flex flex-wrap desktop:p-1 relative desktop:gap-[13.2px]">
        <Card
          isFooterBlurred
          radius="lg"
          className="border-none w-full desktop:h-[311px] laptop:mb-[10px] cursor-pointer"
        >
          {actionImgUrl ? (
            <img
              src={actionImgUrl.img_url}
              alt="Green Action Image"
              className="w-full h-full"
              onClick={handleActionClick}
            />
          ) : (
            <div
              className="none bg-gray-300 w-full h-full rounded"
              onClick={handleActionClick}
            />
          )}
        </Card>
        <div
          className={`pl-2 ${
            mode === "myPosts" && "pt-5"
          } bg-[#F9F9F9]  desktop:p-5 desktop:rounded-2xl w-full`}
        >
          <div className="flex w-full gap-0">
            <div className="flex gap-2 mb-4 min-w-[240px] items-center ">
              <p className=" max-w-[165px] desktop:text-[15px] font-bold overflow-hidden whitespace-nowrap overflow-ellipsis">
                {title}
              </p>
              {is_recruiting ? (
                <Chip
                  size="sm"
                  className="text-white w-[41px] h-[16px] bg-[#B3C8A1] rounded-[5px] text-center text-[9pt]"
                >
                  모집중
                </Chip>
              ) : (
                <Chip
                  size="sm"
                  className="text-white w-[50px] h-[16px] bg-[#5F5F5F] rounded-[5px] text-center text-[9pt]"
                >
                  모집마감
                </Chip>
              )}
            </div>
            <div className="flex justify-end items-start pt-0 gap-[15px] text-sm w-full">
              <div className="flex">
                <Image
                  src={person}
                  alt="person-icon"
                  className="w-[22px] h-[20px]"
                />
                <p>{recruit_number}</p>
              </div>
              {/* LINK 북마크 컴포넌트 */}
              <Bookmark action_id={id} mode={mode} />
            </div>
          </div>
          <div className="flex gap-1 text-sm">
            <IoIosCalendar size="15" />
            <p>
              {start_date} - {end_date}
            </p>
          </div>
          <hr className="text-gray-700 w-[13rem] my-1" />
          <div className="flex justify-between">
            <div className="flex gap-1">
              <GrLocation size="15" />
              <p className="text-sm overflow-hidden whitespace-nowrap overflow-ellipsis">
                {location}
              </p>
            </div>

            {mode === "myPosts" && (
              <>
                <Dropdown
                  placement="bottom"
                  className="flex w-[10px] p-0 m-0 rounded-3xl justify-end" //max-w-[5rem]
                >
                  <DropdownTrigger>
                    <Button className="bg-transparent ml-[20px] justify-end">
                      <Image
                        src={optionDots}
                        alt="option-three-dots-icon"
                        className="w-[2.3px]"
                      />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions" className="p-3">
                    {is_recruiting && ( // !!
                      <DropdownItem key="모집마감" onClick={handleModalOpen}>
                        모집마감
                      </DropdownItem>
                    )}
                    <DropdownItem key="수정" onClick={handleEditClick}>
                      수정
                    </DropdownItem>
                    <DropdownItem
                      key="삭제"
                      color="danger"
                      onClick={handleDeleteClick}
                    >
                      삭제
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>

                {/* 모집마감 변경 모달 */}
                <MyActionRecruitingModal
                  id={id}
                  isOpen={isOpen}
                  onClose={onClose}
                  onOpenChange={onOpenChange}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyActionCard;
