"use client";

import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  CircularProgress,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { HiOutlinePlus } from "react-icons/hi2";
import { TfiPencil } from "react-icons/tfi";
import { IoIosCamera } from "react-icons/io";
import pointQuestion from "@/app/_assets/question_circle.png";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAuthStore } from "@/app/_store/authStore";
import {
  useUpdateUserIntro,
  useUpdateUserName,
} from "@/app/_hooks/useMutations/mypage";
import { User } from "@/app/_types";
import { useFetchUserInfo } from "@/app/_hooks/useQueries/mypage";
import MyProfileEditModal from "./MyProfileEditModal";

const MyProfile = ({ user_uid }: { user_uid: string }) => {
  // const { user } = useAuthStore();
  // const { display_name, email, introduction, point, profile_img } =
  //   user as User;
  console.log(user_uid);

  const { data, isLoading } = useFetchUserInfo(
    "ed71fea7-2892-4769-b7d0-1f8ba330c213",
  );
  // useEffect(() => {
  //   const { data, isLoading } = useFetchUserInfo(
  //     "ed71fea7-2892-4769-b7d0-1f8ba330c213",
  //   );
  // }, [data]);

  // console.log(data);
  const { display_name, email, introduction, point, profile_img } =
    (data as User) || "";

  // console.log(display_name);

  // const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [isIntroEditing, setIsIntroEditing] = useState<boolean>(false);
  const [editedIntro, setEditedIntro] = useState<string>(introduction); // 초기값 기존 intro

  const { updateIntro } = useUpdateUserIntro(
    "ed71fea7-2892-4769-b7d0-1f8ba330c213", // user_uid
    editedIntro,
  );

  const handleEditIntroClick = () => {
    setIsIntroEditing(true);
  };

  // 자기소개 등록 취소
  const handleCancelEditIntroClick = () => {
    setIsIntroEditing(false);
    setEditedIntro(introduction);
  };

  // 자기소개 등록 완료
  const handleEditIntroSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateIntro();
    setIsIntroEditing(false);
  };

  const handleEditedIntroChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setEditedIntro(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress color="success" label="Loading..." />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 w-[23rem] min-h-[43rem] ">
      <Card>
        <div className="flex p-3">
          <div className="flex gap-4 items-center">
            <Avatar
              showFallback
              src={profile_img || ""}
              className="w-[4.5rem] h-[4.5rem]"
            />
            <div className="flex flex-col gap-[0.1rem] w-[9rem] overflow-hidden whitespace-nowrap overflow-ellipsis">
              <p className="font-bold text-sm">{display_name}</p>
              <p className="text-[0.7rem]">{email}</p>
              <p className="text-sm font-bold">Greener</p>
            </div>
          </div>
          <div className="flex items-end pb-2">
            <MyProfileEditModal
              display_name={display_name}
              profile_img={profile_img || ""}
            />
          </div>
        </div>
      </Card>
      <Card className="w-full min-h-[18rem] p-[0.5rem]">
        <CardHeader className="font-bold">
          <p>My Profile</p>
        </CardHeader>
        <CardBody>
          {/* SECTION - 자기소개 등록 */}
          {isIntroEditing ? (
            <form onSubmit={handleEditIntroSubmit}>
              <textarea
                value={editedIntro}
                onChange={(e) => {
                  handleEditedIntroChange(e);
                }}
                className="resize-none rounded-xl w-full h-full p-2 text-sm bg-gray-200/50"
                placeholder="100자 이내"
                maxLength={100}
              />
              <div className="flex justify-end">
                <Button onClick={handleCancelEditIntroClick}>작성취소</Button>
                <Button type="submit">작성완료</Button>
              </div>
            </form>
          ) : (
            <>
              <p className="text-sm">{introduction}</p>
              <div className="flex justify-end">
                <button onClick={handleEditIntroClick}>
                  <HiOutlinePlus className="cursor-pointer" />
                </button>
              </div>
            </>
          )}
        </CardBody>
      </Card>

      {/* SECTION - 모달
      <Modal
        isOpen={isOpen}
        onClose={handleModalClose}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            //   NOTE 모달
            <div className="p-5 flex flex-col items-center">
              <form
                className="flex flex-col gap-5 items-center justify-center"
                onSubmit={handleEditProfileSubmit}
              >
                <ModalHeader>
                  <p className="text-lg">Profile</p>
                </ModalHeader>
                <div className="flex flex-col items-center gap-5">
                  <p className="text-[0.8rem] text-gray-600">
                    나중에 언제든지 변경할 수 있습니다.
                  </p>
                  <Avatar
                    showFallback
                    src={profile_img || ""}
                    className="w-[8rem] h-[8rem]"
                  />
                  <IoIosCamera size="35" />
                  <label htmlFor="user-display-name">사용자 이름</label>
                  <Input
                    type="text"
                    label="사용자 이름"
                    value={editedName}
                    defaultValue={display_name}
                    onChange={(e) => {
                      handleDisplayNameChange(e);
                    }}
                    id="User Display Name"
                    className="rounded"
                    placeholder="2 ~ 10자 이내"
                    maxLength={10}
                    minLength={2}
                    isRequired
                    variant="flat"
                  />
                </div>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button type="submit" color="success">
                    작성완료
                  </Button>
                </ModalFooter>
              </form>
            </div>
          )}
        </ModalContent>
      </Modal> */}

      <Card className="">
        <CardHeader className="mb-[-1.5rem]">
          <p>Points</p>
        </CardHeader>
        <CardBody className="flex">
          <div className="font-bold w-[10rem]">{point} P</div>
        </CardBody>
        <CardFooter className="flex justify-end">
          {/* mt-[-2.7rem] - hover 안됨*/}
          <Tooltip
            showArrow={true}
            key="bottom"
            placement="bottom"
            content={
              <div className="text-gray-500 p-2 text-center  text-[0.8rem]">
                {/* text-[0.8rem] */}
                <p>Q. 포인트는 어디에 사용하나요?</p>
                <p>
                  A. 'Goods'에 있는 친환경 굿즈들을 <br /> 구매하실 수 있어요!
                </p>
                <br />
                <p>Q. 포인트는 어떻게 얻을 수 있나요?</p>
                <p>
                  A. 'Green Action' - '개인과 함께해요'에서 <br />
                  개인 Green Action에 참여하고
                  <br /> 'Community'에 인증샷을 올려주시면
                  <br /> 포인트 획득이 가능해요!
                </p>
              </div>
            }
            className="w-[19rem]"
          >
            <Image src={pointQuestion} alt="questionMark" width={17} />
          </Tooltip>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MyProfile;
