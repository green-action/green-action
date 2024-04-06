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
import React from "react";
import { FaRegStar } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { GrLocation } from "react-icons/gr";
import { IoIosCalendar } from "react-icons/io";
import MyActionRecruitingModal from "./MyActionRecruitingModal";
import { useRouter } from "next/navigation";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Bookmark from "../bookmark/Bookmark";

interface ActionCardProps {}

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
    actionBookmarks,
  } = mode === "bookmark" ? action.bookmarkedAction : action;

  const actionImgUrl = actionImgUrls[0];
  const bookmarkCount = actionBookmarks?.length;

  const handleActionClick = () => router.push(`/individualAction/detail/${id}`);

  const handleEditClick = () => {
    router.push(`/individualAction/edit/${id}`);
  };

  const handleDeleteClick = () => {};

  return (
    <div key={id}>
      {/* SECTION - 모달 => 커스텀 alert 창 사용하기 ? / 모달 -> 카드 내에서 뜨도록 구현 시도해보기? */}
      <div className="none w-[330px] h-[25rem] flex flex-wrap  p-1 ">
        <Card
          isFooterBlurred
          radius="lg"
          className="border-none w-full h-[260px] cursor-pointer"
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
        <div className={`pl-2 ${mode === "mypost" && "pt-5"}`}>
          <div className="flex w-[300px] justify-around ">
            <div className="flex gap-2 mb-4 ">
              <p className="max-w-[160px] font-bold  overflow-hidden whitespace-nowrap overflow-ellipsis">
                {title}
              </p>
              {is_recruiting ? (
                <Chip size="sm" color="success" className="text-white">
                  모집중
                </Chip>
              ) : (
                <Chip size="sm" className="text-white">
                  모집마감
                </Chip>
              )}
            </div>
            <div className="flex items-start pt-1 gap-2 text-sm">
              <div className="flex gap-1">
                <GoPerson size="15" />
                <p>{recruit_number}</p>
              </div>
              {/* <div className="flex gap-1 items-center"> */}
              {/* <FaRegStar size="15" /> */}
              {/* LINK 북마크 컴포넌트 */}
              <Bookmark action_id={id} />
              {/* </div> */}
            </div>
            {/* 커스텀컨펌창 - 크기?등 ui 수정 어려운 문제 */}
            {/* <CustomConfirm
              text=".."
              buttonName={action.is_recruiting ? "모집중" : "모집마감"}
              okFunction={handleRecruitingChange}
            /> */}
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

            {mode === "mypost" && (
              <>
                <Dropdown
                  placement="bottom-end"
                  className="flex w-[10px] p-0 m-0 rounded-3xl justify-end" //max-w-[5rem]
                >
                  <DropdownTrigger>
                    <Button className="bg-transparent ">
                      <HiOutlineDotsVertical className="cursor-pointer" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions" className="p-3">
                    {is_recruiting && (
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
