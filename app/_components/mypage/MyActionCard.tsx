import {
  MODE_MAIN,
  MODE_MY_BOOKMARKS,
  MODE_MY_POSTS,
} from "@/app/_api/constant";
import { useResponsive } from "@/app/_hooks/responsive";
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
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GoArrowRight } from "react-icons/go";
import dateImg from "../../_assets/image/individualAction/image170.png";
import locationImg from "../../_assets/image/individualAction/image35.png";
import Bookmark from "../bookmark/Bookmark";
import MyActionRecruitingModal from "./MyActionRecruitingModal";
import person from "/app/_assets/image/individualAction/person.png";
import optionDots from "/app/_assets/image/logo_icon/icon/mypage/Group 100.png";

import type { MyActionCardProps } from "@/app/_types/mypage/mypage";

const MyActionCard: React.FC<MyActionCardProps> = ({ action, mode }) => {
  const router = useRouter();
  const { isDesktop, isLaptop, isMobile } = useResponsive();
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
  } = mode === MODE_MY_BOOKMARKS ? action.bookmarkedAction : action;

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
      {(isDesktop || isLaptop) && (
        <div
          className={`none   ${
            (mode === MODE_MY_BOOKMARKS || mode === MODE_MY_POSTS) &&
            "laptop:w-[327px] laptop:h-[465px] laptop:mb-[149px] desktop:w-[356px] desktop:h-[505px] desktop:mb-[149px]"
          } ${
            mode === MODE_MAIN &&
            "desktop:w-[356px] desktop:h-[505px] laptop:w-[287px] laptop:h-[251px]"
          } relative`}
        >
          <Card
            isFooterBlurred
            radius="lg"
            className={`border-none w-full desktop:h-[311px] laptop:h-[251px]  ${
              (mode === MODE_MY_POSTS || mode === MODE_MY_BOOKMARKS) &&
              "desktop:h-[311px] laptop:h-[280px] laptop:mb-[10px]"
            } laptop:mb-[10px] shadow-none border-none `}
          >
            {actionImgUrl ? (
              mode === MODE_MAIN ? (
                // 이미지 있고 메인 모드일때
                <Image
                  width={600}
                  height={400}
                  src={actionImgUrl.img_url}
                  alt="Green Action Image"
                  className="w-full h-full"
                />
              ) : (
                // 이미지 있고 메인 모드 아닐 때
                <Image
                  width={600}
                  height={400}
                  src={actionImgUrl.img_url}
                  alt="Green Action Image"
                  className="w-full h-full cursor-pointer"
                  onClick={handleActionClick}
                />
              )
            ) : mode === MODE_MAIN ? (
              // 이미지 없고 메인 모드일때
              <div className="none bg-gray-300 w-full h-full rounded" />
            ) : (
              // 이미지 없고 메인 모드 아닐 때
              <div
                className="none bg-gray-300 w-full h-full rounded"
                onClick={handleActionClick}
              />
            )}
          </Card>
          <div
            className={`pl-3 ${
              (mode === MODE_MAIN ||
                mode === MODE_MY_POSTS ||
                mode === MODE_MY_BOOKMARKS) &&
              "pt-5 pl-5"
            } bg-[#F9F9F9] p-5 rounded-2xl w-full mt-3 flex flex-col gap-[5px] ${
              mode === MODE_MAIN && ""
            }`}
          >
            <div className="flex w-full justify-between laptop:gap-[6px] mb-4 laptop:min-w-[190px] items-center">
              {is_recruiting ? (
                <Chip
                  classNames={{
                    base: "desktop:h-[18px] laptop:h-[16px]",
                    content:
                      "desktop:w-[50px] laptop:w-[40px] flex justify-center items-center",
                  }}
                  className="text-white laptop:w-[20px] bg-[#B3C8A1] rounded-3xl text-center desktop:text-[13.3px] laptop:text-[10.6px]"
                >
                  모집중
                </Chip>
              ) : (
                <Chip
                  classNames={{
                    base: "desktop:h-[18px] laptop:h-[16px]",
                    content:
                      "desktop:w-[55px] laptop:w-[50px] flex justify-center items-center",
                  }}
                  className="text-white bg-[#5F5F5F] rounded-3xl text-center desktop:text-[13.3px] laptop:text-[10.6px]"
                >
                  모집마감
                </Chip>
              )}
              <div className="flex justify-end items-start pt-0 desktop:gap-[15px] laptop:gap-[10px]  desktop:text-[14px] laptop:text-[11px] w-full">
                {/* 모집인원, 북마크 */}
                <div className="flex items-center desktop:gap-[4px] laptop:gap-[4px]">
                  <Image
                    src={person}
                    alt="person-icon"
                    className="desktop:w-[19px] laptop:w-[18px]"
                  />
                  <p>{recruit_number}</p>
                </div>
                {/* LINK 북마크 컴포넌트 */}
                <div className="flex desktop:mt-[0px] laptop:mt-[0.5px]">
                  <Bookmark action_id={id} mode={mode} />
                </div>
              </div>
            </div>
            <p className="w-full desktop:text-[15px] laptop:text-[13px] font-bold overflow-hidden whitespace-nowrap overflow-ellipsis mb-[10px]">
              {title}
            </p>
            <div className="flex gap-12 items-center desktop:text-sm laptop:text-[12px] ml-[1px]">
              <div className="flex gap-2">
                <Image
                  src={dateImg}
                  alt="날짜 아이콘"
                  className="w-[13px] h-[13px] mt-[2px]"
                />
                <p>
                  {start_date} - {end_date}
                </p>
              </div>
            </div>
            <hr className="text-gray-700 desktop:w-[190px] laptop:w-[170px]" />
            <div
              className={`flex gap-1 ${
                mode !== MODE_MY_POSTS && "justify-between"
              }`}
            >
              <div className="flex gap-1">
                <Image
                  src={locationImg}
                  alt="장소 아이콘"
                  className="w-[16px] h-[16px] mt-[2px]"
                />
                <p className="desktop:min-w-[170px] laptop:min-w-[150px] desktop:text-sm overflow-hidden whitespace-nowrap overflow-ellipsis laptop:text-[12px]">
                  {location}
                </p>
              </div>

              {mode !== MODE_MY_POSTS && (
                <div>
                  <GoArrowRight
                    size="30"
                    color="#9e9d9d"
                    className="cursor-pointer"
                    onClick={handleActionClick}
                  />
                </div>
              )}

              {mode === MODE_MY_POSTS && (
                <div className="flex items-center desktop:ml-10 laptop:ml-[50px]">
                  <Dropdown
                    placement="bottom"
                    className="flex w-[10px] p-0 m-0 rounded-3xl justify-end"
                  >
                    <DropdownTrigger>
                      <Button className="bg-transparent w-[5px] justify-end">
                        <Image
                          src={optionDots}
                          alt="option-three-dots-icon"
                          className="w-[2.3px]"
                        />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions" className="p-3">
                      {is_recruiting ? (
                        <DropdownItem key="모집마감" onClick={handleModalOpen}>
                          모집마감
                        </DropdownItem>
                      ) : (
                        <></>
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
                </div>
              )}

              {isMobile && (
                <div key={id} className="relative">
                  <div
                    className={`none desktop:w-[356px] desktop:h-[455px] phone:h-[98px] ${
                      (mode === MODE_MY_BOOKMARKS || mode === MODE_MY_POSTS) &&
                      "laptop:w-[327px] laptop:h-[420px] laptop:mb-[149px]"
                    } ${
                      mode === MODE_MAIN && "phone:w-[140px] phone:h-[98px]"
                    } relative`}
                  >
                    <Card
                      isFooterBlurred
                      radius="lg"
                      className={`border-none w-full phone:h-[98px] ${
                        (mode === MODE_MY_POSTS ||
                          mode === MODE_MY_BOOKMARKS ||
                          mode === MODE_MAIN) &&
                        "phone:h-[98px] phone:mb-[10px]"
                      } phone:mb-[10px] cursor-pointer shadow-none border-none`}
                    >
                      {actionImgUrl ? (
                        <Image
                          width={600}
                          height={400}
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

                    <div className="flex w-full gap-0">
                      <p className="max-w-[165px] desktop:text-[15px] laptop:text-[13px] font-bold overflow-hidden whitespace-nowrap overflow-ellipsis">
                        {title}
                      </p>
                      {is_recruiting ? (
                        <Chip
                          classNames={{
                            base: "desktop:h-[18px] laptop:h-[16px]",
                            content:
                              "desktop:w-[41px] laptop:w-[34px] flex justify-center items-center",
                          }}
                          className="text-white w-[20px] bg-[#B3C8A1] rounded-[5px] text-center text-[10.6px]"
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
                          className="text-white bg-[#5F5F5F] rounded-[5px] text-center desktop:text-[13.3px] laptop:text-[10.6px]"
                        >
                          모집마감
                        </Chip>
                      )}
                    </div>
                    <div className="flex justify-end items-start pt-0 desktop:gap-[15px] laptop:gap-[10px]  desktop:text-[14px] laptop:text-[11px]  w-full">
                      {/* LINK 북마크 컴포넌트 */}
                      <div className="flex desktop:mt-[0px] laptop:mt-[0.5px]">
                        <Bookmark action_id={id} mode={mode} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {isMobile && (
        <div
          className={`none ${
            (mode === MODE_MY_BOOKMARKS || mode === MODE_MY_POSTS) &&
            "h-[150px] gap-4"
          }relative`}
        >
          <Card
            isFooterBlurred
            radius="lg"
            className={`border-none w-full h-full ${
              (mode === MODE_MY_POSTS ||
                mode === MODE_MY_BOOKMARKS ||
                mode === MODE_MAIN) &&
              "phone:h-[98px] "
            } phone:mb-[15px] cursor-pointer shadow-none border-none`}
          >
            {actionImgUrl ? (
              <Image
                width={600}
                height={400}
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

          <div className="flex w-full gap-0">
            <div className="flex flex-col gap-[5px] mb-4 ml-3 min-w-[140px]">
              <p className="max-w-[165px] text-[10px] font-bold overflow-hidden whitespace-nowrap overflow-ellipsis">
                {title?.length > 13 ? `${title?.substring(0, 13)}...` : title}
              </p>
              {is_recruiting ? (
                <Chip
                  classNames={{
                    base: "h-[14px]",
                    content: "w-[33px] flex justify-center items-center",
                  }}
                  className="text-white bg-[#B3C8A1] rounded-[5px] text-center text-[9.3px]"
                >
                  모집중
                </Chip>
              ) : (
                <Chip
                  classNames={{
                    base: "h-[14px]",
                    content: "w-[33px] flex justify-center items-center",
                  }}
                  className="text-white bg-[#5F5F5F] rounded-[5px] text-center text-[9.3px]"
                >
                  모집마감
                </Chip>
              )}
            </div>
            <div className="flex justify-end items-start pt-0 gap-[10px] w-full text-[0px]">
              {/* LINK 북마크 컴포넌트 */}
              <div className="flex mt-[10px]">
                <Bookmark action_id={id} mode={mode} />
              </div>
            </div>
          </div>
          {mode === "myPosts" && (
            <div className="flex items-center ml-[62px] mt-[-50px]">
              <Dropdown
                placement="bottom"
                className="flex w-[10px] p-0 m-0 rounded-3xl justify-end"
              >
                <DropdownTrigger>
                  <Button className="bg-transparent w-[1px] justify-end">
                    <Image
                      src={optionDots}
                      alt="option-three-dots-icon"
                      className="w-[2.3px]"
                    />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions" className="p-3">
                  {is_recruiting ? (
                    <DropdownItem key="모집마감" onClick={handleModalOpen}>
                      모집마감
                    </DropdownItem>
                  ) : (
                    <></>
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
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyActionCard;
