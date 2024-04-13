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

import dateImg from "../../_assets/image/individualAction/image170.png";
import locationImg from "../../_assets/image/individualAction/image35.png";
import rightArrowImg from "../../_assets/image/individualAction/Group89.png";

import person from "/app/_assets/image/logo_icon/icon/mypage/image24.png";
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
      <div
        className={`none desktop:w-[356px] desktop:h-[455px] ${
          (mode === "myBookmarks" || mode === "myPosts") &&
          "laptop:w-[327px] laptop:h-[420px] laptop:mb-[149px]"
        } ${mode === "main" && "laptop:w-[287px] laptop:h-[251px]"} relative`}
        // desktop:h-[25rem]
        // relative 때문에 별 클릭안되는? -z, z-..했으나 안됨
      >
        <Card
          // 이 카드의 classsname지워도 가능
          isFooterBlurred
          radius="lg"
          className={`border-none w-full desktop:h-[311px] laptop:h-[251px]  ${
            (mode === "myPosts" || mode === "myBookmarks") &&
            "desktop:h-[311px] laptop:h-[280px] laptop:mb-[10px]"
          } laptop:mb-[10px] cursor-pointer`}
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
          className={`pl-3 ${
            (mode === "main" || mode === "myPosts") && "pt-5 pl-5"
          } bg-[#F9F9F9]  p-5 rounded-2xl w-full mt-3`}
        >
          <div className="flex w-full gap-0">
            <div className="flex desktop:gap-2 laptop:gap-[6px] mb-4 desktop:min-w-[240px] laptop:min-w-[190px] items-center">
              <p className=" max-w-[165px] desktop:text-[15px] laptop:text-[13px] font-bold overflow-hidden whitespace-nowrap overflow-ellipsis">
                {title}
              </p>
              {is_recruiting ? (
                <Chip
                  classNames={{
                    base: "desktop:h-[18px] laptop:h-[16px]",
                    content:
                      "desktop:w-[41px] laptop:w-[34px] flex justify-center items-center",
                  }}
                  className="text-white laptop:w-[20px] bg-[#B3C8A1] rounded-[5px] text-center desktop:text-[10pt] laptop:text-[8pt]"
                >
                  모집중
                </Chip>
              ) : (
                <Chip
                  classNames={{
                    base: "desktop:h-[18px] laptop:h-[16px]",
                    content:
                      "desktop:w-[50px] laptop:w-[42px] flex justify-center items-center",
                  }}
                  className="text-white bg-[#5F5F5F] rounded-[5px] text-center desktop:text-[10pt] laptop:text-[8pt]"
                >
                  모집마감
                </Chip>
              )}
            </div>
            <div className="flex justify-end items-start pt-0 desktop:gap-[15px] laptop:gap-[10px]  desktop:text-[14px] laptop:text-[11px] w-full">
              <div className="flex items-center desktop:gap-[1px]">
                <Image
                  src={person}
                  alt="person-icon"
                  className="desktop:w-[23px] desktop:h-[21px] laptop:w-[20px] laptop:h-[18px]"
                />
                <p>{recruit_number}</p>
              </div>
              {/* LINK 북마크 컴포넌트 */}
              <div className="flex laptop:mt-[1px]">
                <Bookmark action_id={id} mode={mode} />
              </div>
            </div>
          </div>
          <div className="flex gap-2 desktop:text-sm laptop:text-[12px] ml-[1px]">
            <Image
              src={dateImg}
              alt="날짜 아이콘"
              className="w-[13px] h-[13px] mt-[2px]"
            />
            <p>
              {start_date} - {end_date}
            </p>
          </div>
          <hr className="text-gray-700 desktop:w-[190px] laptop:w-[170px] my-1" />
          <div className="flex justify-between">
            <div className="flex gap-1">
              <Image
                src={locationImg}
                alt="장소 아이콘"
                className="w-[16px] h-[16px] mt-[2px]"
              />
              <p className="desktop:text-sm overflow-hidden whitespace-nowrap overflow-ellipsis laptop:text-[12px]">
                {location}
              </p>
            </div>
            <div>
              <Image
                src={rightArrowImg}
                alt="우향 화살표 아이콘"
                className="desktop:w-[22px] laptop:w-[19px] desktop:h-[15px] laptop:h-[12px] mr-2 desktop:mb-4 laptop:mt-0 cursor-pointer"
                onClick={handleActionClick}
              />
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
