import { formatToLocaleDateString } from "@/utils/date/date";
import {
  Button,
  Card,
  Chip,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { FaRegStar } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { GrLocation } from "react-icons/gr";
import { IoIosCalendar } from "react-icons/io";
import CustomConfirm from "../customConfirm/CustomConfirm";
import { useUpdateActionRecruiting } from "@/app/_hooks/useMutations/mypage";
import MyActionRecruitingModal from "./MyActionRecruitingModal";

interface ActionCardProps {}

const MyActionCard = ({ action }: any) => {
  const formattedStartDate = formatToLocaleDateString(action.start_date || "");
  const formattedEndDate = formatToLocaleDateString(action.end_date || "");

  return (
    <div key={action.id}>
      {/* SECTION - 모달 => 커스텀 alert 창 사용하기 ? / 모달 -> 카드 내에서 뜨도록 구현 시도해보기? */}
      {/* <Modal
        isOpen={isOpen}
        // onClose={handleModalClose}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            //   NOTE 모달
            <div className="flex flex-col items-center p-10">
              <ModalHeader>
                <p className="text-lg">모집 마감을 하시겠습니까?</p>
              </ModalHeader>
              <ModalFooter>
                <Button color="primary" onPress={handleUpdateRecruiting}>
                  네
                </Button>
                <Button color="danger" onPress={onClose}>
                  아니오
                </Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal> */}

      <Card className="w-[21rem] h-[25rem] flex flex-wrap gap-3 cursor-pointer p-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
        {/* TODO 누르면 해당 상세페이지로 이동 */}
        {/* <CardHeader> */}
        {/* 이미지 없는 경우 기본? */}
        {action.actionImgUrls[0] ? (
          // <Card className="h-[230px]">
          <img
            src={action.actionImgUrls[0]?.img_url}
            alt="Green Action Image"
            width={350}
            height={230}
            className="rounded-3xl p-3"
          />
        ) : (
          // </Card>
          <div className="bg-gray-300 width-[100px] h-[230px] rounded-3xl" />
        )}

        {/* <img
                      src={action.actionImgUrls[0]?.img_url}
                      alt="action-img"
                      width={320}
                      height={150}
                      className="rounded-3xl"
                    /> */}
        {/* </CardHeader> */}
        {/* <CardBody> */}
        <div className="p-2">
          <div className="flex gap-3">
            <p className="font-bold">{action.title}</p>
            {action.is_recruiting ? (
              <MyActionRecruitingModal id={action.id} />
            ) : (
              <Chip size="sm">모집마감</Chip>
            )}

            {/* 커스텀컨펌창 - 크기?등 ui 수정 어려운 문제 */}
            {/* <CustomConfirm
              text=".."
              buttonName={action.is_recruiting ? "모집중" : "모집마감"}
              okFunction={handleRecruitingChange}
            /> */}
          </div>
          <div className="flex gap-1">
            {/* <BsPerson size="20" /> 아이콘 보류 */}
            <GoPerson size="20" />
            <p>{action.recruit_number}</p>
            <FaRegStar size="20" />
            <p>{action.actionBookmarks.length}</p>
          </div>
          <div className="flex gap-1">
            <IoIosCalendar size="18" />
            <p>
              {formattedStartDate} - {formattedEndDate}
            </p>
          </div>
          <hr className="text-gray-700 w-[14rem]" />
          <div className="flex gap-1">
            <GrLocation size="18" />
            <p>{action.location}</p>
          </div>
        </div>
        {/* </CardBody> */}
      </Card>
    </div>
  );
};

export default MyActionCard;
