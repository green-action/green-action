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
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import { signUpNewUser } from "../_api/auth";
import logoImg from "../_assets/image/logo_icon/logo/white.png";
import AlertModal from "../_components/community/AlertModal";
import { useResponsive } from "../_hooks/responsive";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");
  const [nickname, SetNickname] = useState("");
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [modalPlacement, setModalPlacement] = React.useState("auto");
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  // alert 대체 모달창을 위한 상태관리
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const [message, setMessage] = useState("");

  const validatePasswords = () => password !== confirmPassword;

  // 이메일,비밀번호 형식
  const validatePassword = (value: string) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(value);
  const validateEmail = (value: string) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

  // 이메일 중복확인해보기@@ 닉네임중복확인

  // 회원가입 버튼
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword || !nickname) {
      // alert("입력란을 입력해주세요.");
      setMessage("입력란을 입력해주세요.");
      setIsOpenAlertModal(true);
      return;
    }

    if (
      !validateEmail(email) ||
      !validatePassword(password) ||
      password !== confirmPassword ||
      nickname.length < 2 ||
      nickname.length > 10
    ) {
      setMessage("회원가입 양식을 확인해주세요.");
      setIsOpenAlertModal(true);
      return;
    }

    try {
      const users = await signUpNewUser(email, password, nickname);
      onOpen();
    } catch (error) {
      if (error === "User already registered") {
        console.error("회원가입 오류:", error);
        setMessage("이미 등록된 사용자입니다. 다른 이메일을 등록해주세요.");
        setIsOpenAlertModal(true);
        return;
      }
      console.error("회원가입 오류:", new Error());
      setMessage("회원가입중 오류가 발생하였습니다.");
      setIsOpenAlertModal(true);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleClick = () => router.push("/login");

  return (
    <div
      className="desktop:w-screen laptop:w-screen  phone:m-w-[360px] h-screen flex 
      desktop:justify-around laptop:justify-around phone:justify-center
  items-center desktop:bg-main-img laptop:bg-main-img bg-cover  
  desktop:bg-blend-darken desktop:bg-black desktop:bg-opacity-10 
  laptop:bg-blend-darken laptop:bg-black laptop:bg-opacity-10 phone:bg-none"
    >
      <div className="flex flex-col items-center justify-center">
        {(isDesktop || isLaptop) && (
          <Image
            className="desktop:w-[126px] laptop:w-[126px] phone:w-[50px] h-[29px] cursor-pointer"
            src={logoImg}
            alt="logo"
            onClick={() => router.push("/")}
          />
        )}

        {isMobile && (
          <div className="flex flex-col absolute">
            <FaChevronLeft
              className=" relative top-[-270px] ml-[60px] cursor-pointer z-10"
              onClick={() => router.push("/")}
            />
          </div>
        )}
      </div>
      <Card className=" desktop:w-[578px] xh-full flex flex-col items-center justify-center bg-white rounded-3xl laptop:w-[450px]  phone:shadow-none">
        <CardBody className="flex flex-col items-center px-8 py-8 h-full gap-5 mt-[60px] ">
          <h2 className=" desktop:text-2xl laptop:text-2xl font-bold mb-16 phone:text-[18px]">
            Sign up
          </h2>

          <form
            onSubmit={handleSignUp}
            className="w-full flex flex-col items-center"
          >
            <Input
              type="email"
              label="Email"
              variant="bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-9  desktop:w-[427px] h-[60px] relative laptop:w-[333px] phone:w-[291px]"
            />
            {isDesktop && (
              <>
                {email !== "" && !validateEmail(email) && (
                  <p className="text-red-500 text-xs absolute desktop:top-[210px] desktop:left-[80px]">
                    잘못된 이메일형식 입니다
                  </p>
                )}
              </>
            )}
            {isLaptop && (
              <>
                {email !== "" && !validateEmail(email) && (
                  <p className="text-red-500 text-xs absolute laptop:top-[210px] laptop:left-[65px]">
                    잘못된 이메일형식 입니다
                  </p>
                )}
              </>
            )}
            {isMobile && (
              <>
                {email !== "" && !validateEmail(email) && (
                  <p className="text-red-500 text-xs absolute phone:top-[206px] phone:left-[40px]">
                    잘못된 이메일형식 입니다
                  </p>
                )}
              </>
            )}

            <Input
              type={passwordVisible ? "text" : "password"}
              label="password"
              variant="bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-9 desktop:w-[427px] h-[60px] relative laptop:w-[333px] phone:w-[291px]"
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
            {isDesktop && (
              <>
                {password !== "" && !validatePassword(password) && (
                  <p className="text-red-500 text-xs absolute desktop:top-[307px] desktop:left-[80px]">
                    비밀번호는 영문자, 숫자, 특수문자(@$!%*?&)를 포함하여 6자
                    이상이어야 합니다.
                  </p>
                )}
              </>
            )}
            {isLaptop && (
              <>
                {password !== "" && !validatePassword(password) && (
                  <p className="text-red-500 text-xs absolute laptop:top-[304px] laptop:left-[65px] laptop:w-[67%]">
                    비밀번호는 영문자, 숫자, 특수문자(@$!%*?&)를 포함하여 6자
                    이상이어야 합니다.
                  </p>
                )}
              </>
            )}
            {isMobile && (
              <>
                {password !== "" && !validatePassword(password) && (
                  <p className="text-red-500 text-xs absolute phone:w-[77%] phone:top-[301px] phone:left-[40px]">
                    비밀번호는 영문자, 숫자, 특수문자(@$!%*?&)를 포함하여 6자
                    이상이어야 합니다.
                  </p>
                )}
              </>
            )}

            <Input
              type={passwordVisible ? "text" : "password"}
              label="confirmPassword"
              value={confirmPassword}
              variant="bordered"
              onChange={(e) => SetConfirmPassword(e.target.value)}
              className="mb-9 desktop:w-[427px] h-[60px] relative laptop:w-[333px] phone:w-[291px]"
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
            {isDesktop && (
              <>
                {validatePasswords() &&
                  password !== "" &&
                  confirmPassword !== "" && (
                    <p className="text-red-500 text-xs absolute desktop:top-[400px] desktop:left-[80px]">
                      비밀번호가 일치하지 않습니다.
                    </p>
                  )}
                {!validatePasswords() &&
                  password !== "" &&
                  confirmPassword !== "" && (
                    <p className="text-green-500 text-xs absolute desktop:top-[400px] desktop:left-[80px]">
                      비밀번호가 일치합니다.
                    </p>
                  )}
              </>
            )}

            {isLaptop && (
              <>
                {validatePasswords() &&
                  password !== "" &&
                  confirmPassword !== "" && (
                    <p className="text-red-500 text-xs absolute laptop:top-[402px] laptop:left-[65px]">
                      비밀번호가 일치하지 않습니다.
                    </p>
                  )}
                {!validatePasswords() &&
                  password !== "" &&
                  confirmPassword !== "" && (
                    <p className="text-green-500 text-xs absolute laptop:top-[402px] laptop:left-[65px]">
                      비밀번호가 일치합니다.
                    </p>
                  )}
              </>
            )}
            {isMobile && (
              <>
                {validatePasswords() &&
                  password !== "" &&
                  confirmPassword !== "" && (
                    <p className="text-red-500 text-xs absolute phone:top-[398px] phone:left-[40px]">
                      비밀번호가 일치하지 않습니다.
                    </p>
                  )}
                {!validatePasswords() &&
                  password !== "" &&
                  confirmPassword !== "" && (
                    <p className="text-green-500 text-xs absolute phone:top-[398px] phone:left-[40px]">
                      비밀번호가 일치합니다.
                    </p>
                  )}
              </>
            )}
            <Input
              type="text"
              label="Nickname"
              variant="bordered"
              value={nickname}
              onChange={(e) => SetNickname(e.target.value)}
              className="mb-9 desktop:w-[427px] h-[60px] relative laptop:w-[333px] phone:w-[291px]"
              maxLength={10}
            />
            {isDesktop && (
              <>
                {nickname && (nickname.length < 2 || nickname.length > 10) && (
                  <p className="text-red-500 text-xs absolute desktop:top-[499px] desktop:left-[80px]">
                    닉네임은 최소 2글자 이상, 최대 10글자 이하이어야 합니다.
                  </p>
                )}
              </>
            )}
            {isLaptop && (
              <>
                {nickname && (nickname.length < 2 || nickname.length > 10) && (
                  <p className="text-red-500 text-xs absolute laptop:top-[499px] laptop:left-[65px]">
                    닉네임은 최소 2글자 이상, 최대 10글자 이하이어야 합니다.
                  </p>
                )}
              </>
            )}
            {isMobile && (
              <>
                {nickname && (nickname.length < 2 || nickname.length > 10) && (
                  <p className="text-red-500 text-xs absolute phone:top-[493px] phone:left-[40px]">
                    닉네임은 최소 2글자 이상, 최대 10글자 이하이어야 합니다.
                  </p>
                )}
              </>
            )}
            <Button
              type="submit"
              variant="solid"
              radius="sm"
              className="bg-black text-white text-[15px] desktop:w-[427px] h-[40px] mt-5 laptop:w-[333px] phone:w-[291px]  desktop:rounded-lg laptop:rounded-lg phone:rounded-full"
            >
              Signup
            </Button>
          </form>
          <div className="flex gap-4">
            <p className="text-gray-500">이미 회원이신가요?</p>
            <button onClick={handleClick}>로그인</button>
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
              <ModalBody className="flex flex-col gap-5 justify-center items-center py-[70px]">
                <p className="font-bold text-center">
                  회원가입완료
                  <br />
                  🎉SOOM에 오신 것을 환영합니다🎉
                </p>
                <p className="font-bold text-center text-[16px]">
                  축하합니다!
                  <span className="block">1000 Point를 획득하셨습니다!</span>
                </p>
                <p className="text-[#8f8f8f] text-[12px] text-center">
                  내용과 관련 없는 이미지일 경우
                  <br /> 포인트가 환수될 수 있습니다.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-black text-white"
                  onPress={() => router.push("/login")}
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

export default SignUp;
