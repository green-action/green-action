"use client";

import {
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import googleimg from "../_assets/image/logo_icon/icon/login/google.png";
import kakaoimg from "../_assets/image/logo_icon/icon/login/kakao.png";
import logoImg from "../_assets/image/logo_icon/logo/white.png";
import AlertModal from "../_components/community/AlertModal";
import { FaChevronLeft } from "react-icons/fa6";
import { useResponsive } from "../_hooks/responsive";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalPlacement, setModalPlacement] = React.useState("auto");
  const { isDesktop, isLaptop, isMobile } = useResponsive();
  // const { isLoggedIn, login } = useAuthStore();

  // alert 대체 모달창을 위한 상태관리
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const [message, setMessage] = useState("");

  const handleSingIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      if (!email || !password) {
        setMessage("이메일과 비밀번호를 입력해주세요.");
        setIsOpenAlertModal(true);
        return;
      }

      const result = await signIn("id-password-credential", {
        id: email,
        password,
        redirect: false,
      });

      if (result?.error) {
        console.error(result.error);
        setMessage("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
        setIsOpenAlertModal(true);
        return;
      }

      onOpen();
    } catch (error) {
      console.error(error);
      setMessage("로그인에 실패했습니다. 양식을 확인해주세요.");
      setIsOpenAlertModal(true);
    }
  };

  const handleKaKakSingIn = async () => {
    signIn("kakao", {
      redirect: true,
      callbackUrl: "/",
    });
  };

  const handleGoogleSingIn = async () => {
    signIn("google", {
      redirect: true,
      callbackUrl: "/",
    });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // 비밀번호찾기 해보기 @@

  return (
    <div
      className="desktop:w-screen laptop:w-screen phone:m-w-[360px] h-screen flex justify-center
    items-center desktop:bg-main-img laptop:bg-main-img bg-cover  
    desktop:bg-blend-darken desktop:bg-black desktop:bg-opacity-10 laptop:bg-blend-darken laptop:bg-black laptop:bg-opacity-10 phone:bg-none "
    >
      <div className="flex flex-col items-center justify-center">
        {(isDesktop || isLaptop) && (
          <Image
            className="desktop:w-[126px] laptop:w-[126px] h-[29px] cursor-pointer"
            src={logoImg}
            alt="logo"
            onClick={() => router.push("/")}
          />
        )}
        {isMobile && (
          <div className="flex flex-col absolute">
            <FaChevronLeft
              className=" relative top-[-270px] left-8 cursor-pointer z-10"
              onClick={() => router.push("/")}
            />
          </div>
        )}
      </div>
      <Card className=" desktop:w-[578px] h-[655px] flex flex-col items-center justify-center bg-white rounded-3xl laptop:w-[450px]  phone:shadow-none">
        <CardBody className="flex flex-col items-center px-8 py-8 h-full gap-5 mt-[70px]">
          <h2 className=" desktop:text-2xl laptop:text-2xl font-bold mb-16 phone:text-[18px]">
            Login
          </h2>

          <form
            onSubmit={handleSingIn}
            className="w-full flex flex-col items-center "
          >
            <Input
              type="email"
              name="email"
              label="Email"
              variant="bordered"
              className="mb-5 desktop:w-[427px] h-[60px] laptop:w-[332px] phone:w-[291px] "
            />
            <Input
              type={passwordVisible ? "text" : "password"}
              variant="bordered"
              name="password"
              label="Password"
              className="mb-5 desktop:w-[427px] h-[60px] laptop:w-[332px] phone:w-[291px]"
              endContent={
                <>
                  <div className="flex items-center">
                    <button
                      type="button"
                      id="togglePasswordVisibility"
                      onClick={togglePasswordVisibility}
                    />
                  </div>
                  <label
                    htmlFor="togglePasswordVisibility"
                    className="flex items-center mb-2"
                  >
                    {passwordVisible ? <PiEyeSlash /> : <PiEyeLight />}
                  </label>
                </>
              }
            />

            <Button
              type="submit"
              variant="solid"
              className="bg-black text-white  desktop:text-[15px] laptop:text-[15px] phone:text-[12px]  desktop:w-[427px] h-[40px] mt-8 laptop:w-[332px] phone:w-[291px] desktop:rounded-lg laptop:rounded-lg phone:rounded-full"
            >
              Login
            </Button>
          </form>
          <p className="text-gray-300">or</p>
          <div className="flex justify-between gap-10 laptop:gap-9">
            <div className=" desktop:w-[191px] h-[40px]  desktop:border-2 laptop:border-2 border-gray-200 rounded-lg flex items-center justify-center laptop:w-[149px] phone:border-no">
              <Image
                src={kakaoimg}
                alt="카카오로그인"
                onClick={handleKaKakSingIn}
                className="cursor-pointer w-[27px] h-[27px] phone:w-[26px],h-[26px]"
              />
            </div>
            <div className="desktop:w-[191px] h-[40px] desktop:border-2 laptop:border-2  border-gray-200 rounded-lg flex items-center justify-center laptop:w-[149px] phone:border-no">
              <Image
                src={googleimg}
                alt="구글로그인"
                onClick={handleGoogleSingIn}
                className="cursor-pointer w-[20px] h-[20px] "
              />
            </div>
          </div>
          <div className="flex gap-4">
            <p className="text-gray-500">아직 회원이 아니신가요?</p>
            <button onClick={() => router.push("/signup")}>회원가입</button>
          </div>
        </CardBody>
      </Card>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        hideCloseButton={true}
        placement="center"
      >
        <ModalContent>
          {() => (
            <>
              <ModalBody className="flex justify-center items-center">
                <p className="font-bold text-center mt-[50px]">로그인 성공!</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-black text-white"
                  onPress={() => router.push("/")}
                >
                  OK
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {isOpenAlertModal && (
        <AlertModal
          isOpen={isOpenAlertModal}
          onClose={() => setIsOpenAlertModal(false)}
          message={message}
        />
      )}
    </div>
  );
};

export default Login;
