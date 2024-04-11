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
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import { signUpNewUser } from "../_api/auth";
import logoImg from "../_assets/image/logo_icon/logo/white.png";
import Image from "next/image";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");
  const [nickname, SetNickname] = useState("");
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validatePasswords = () => password !== confirmPassword;

  // 이메일,비밀번호 형식
  const validatePassword = (value: string) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(value);
  const validateEmail = (value: string) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

  // 회원가입 버튼
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword || !nickname) {
      alert("입력란을 입력해주세요.");
      return;
    }

    if (
      !validateEmail(email) ||
      !validatePassword(password) ||
      password !== confirmPassword ||
      nickname.length < 2 ||
      nickname.length > 10
    ) {
      alert("회원가입 양식을 확인해주세요!");
      return;
    }

    try {
      const users = await signUpNewUser(email, password, nickname);
      onOpen();
    } catch (error) {
      if (error === "User already registered") {
        console.error("회원가입 오류:", error);
        alert("이미 등록된 사용자입니다. 다른 이메일을 시도해주세요.");
        return;
      }
      console.error("회원가입 오류:", error);
      alert("회원가입중 오류가 발생하였습니다!");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleClick = () => router.push("/login");

  return (
    <div className="w-screen h-screen flex justify-around items-center bg-cover bg-main-img  bg-blend-darken bg-black bg-opacity-10">
      <div className="flex flex-col items-center justify-center ">
        <Image className="w-[126px] h-[29px]" src={logoImg} alt="logo" />
      </div>
      <Card className="w-[578px] xh-full flex flex-col items-center justify-center bg-white rounded-3xl">
        <CardBody className="flex flex-col items-center px-8 py-8 h-full gap-5 mt-[60px]">
          <h2 className="text-[24px] font-bold mb-2">Sign up</h2>

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
              className="mb-8 w-[427px] h-[60px]"
            />
            {email !== "" && !validateEmail(email) && (
              <p className="text-red-500 text-xs flex justify-start">
                잘못된 이메일형식 입니다
              </p>
            )}
            <Input
              type={passwordVisible ? "text" : "password"}
              label="password"
              variant="bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-8 w-[427px] h-[60px] "
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
            {password !== "" && !validatePassword(password) && (
              <p className="text-red-500 text-xs">
                비밀번호는 영문자, 숫자, 특수문자(@$!%*?&)를 포함하여 6자
                이상이어야 합니다.
              </p>
            )}
            <Input
              type={passwordVisible ? "text" : "password"}
              label="confirmPassword"
              value={confirmPassword}
              variant="bordered"
              onChange={(e) => SetConfirmPassword(e.target.value)}
              className="mb-8 w-[427px] h-[60px]"
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

            {validatePasswords() &&
              password !== "" &&
              confirmPassword !== "" && (
                <div className="text-red-500 text-xs">
                  비밀번호가 일치하지 않습니다.
                </div>
              )}
            {!validatePasswords() &&
              password !== "" &&
              confirmPassword !== "" && (
                <div className="text-green-500 text-xs">
                  비밀번호가 일치합니다.
                </div>
              )}
            <Input
              type="text"
              label="Nickname"
              variant="bordered"
              value={nickname}
              onChange={(e) => SetNickname(e.target.value)}
              className="mb-8 w-[427px] h-[60px]"
              maxLength={10}
            />
            {nickname && (nickname.length < 2 || nickname.length > 10) && (
              <p className="text-red-500 text-xs">
                닉네임은 최소 2글자 이상, 최대 10글자 이하이어야 합니다.
              </p>
            )}

            <Button
              type="submit"
              variant="solid"
              radius="sm"
              className="bg-black text-white text-[15px]  w-[427px] h-[40px] mt-5"
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
      >
        <ModalContent>
          {() => (
            <>
              <ModalBody>
                <div>
                  회원가입완료
                  <br />
                  🎉SOOM에 오신 것을 환영합니다🎉
                </div>
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
    </div>
  );
};

export default SignUp;
