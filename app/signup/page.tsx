"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import { signUpNewUser } from "../_api/auth";
import { useRouter } from "next/navigation";

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
  const handleSingUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword || !nickname) {
      alert("입력란을 입력해주세요.");
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
      const user = await signUpNewUser(email, password, nickname);
      onOpen();
      console.log(user);
      console.log("회원가입성공:", user);
    } catch (error) {
      console.error("회원가입 오류:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleClick = () => router.push("/login");

  return (
    <div className="bg-[#EBEBEB] w-screen h-screen flex justify-around items-center">
      <div className="flex flex-col items-center justify-center">
        <p>Logo</p>
      </div>
      <Card className="w-[500px] xh-hull flex flex-col items-center justify-center bg-white rounded-lg">
        <CardBody className="flex flex-col items-center px-8 py-8 h-full gap-5">
          <h2 className="text-2xl font-bold mb-2">Sign up</h2>

          <form onSubmit={handleSingUp} className="w-full">
            <Input
              type="email"
              label="Email"
              size="md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-5 border-[BFBFBF] border-1 rounded-[12px]"
            />
            {email !== "" && !validateEmail(email) && (
              <p className="text-red-500 text-xs">잘못된 이메일형식 입니다</p>
            )}
            <Input
              type={passwordVisible ? "text" : "password"}
              label="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-5  border-[BFBFBF] border-1 rounded-[12px]"
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
              onChange={(e) => SetConfirmPassword(e.target.value)}
              className="mb-5  border-[BFBFBF] border-1 rounded-[12px]"
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
              value={nickname}
              onChange={(e) => SetNickname(e.target.value)}
              className="mb-5  border-[BFBFBF] border-1 rounded-[12px]"
            />
            {nickname && (nickname.length < 2 || nickname.length > 10) && (
              <p className="text-red-500 text-xs">
                닉네임은 최소 2자 이상이어야 하며, 최대 10자 이하이어야 합니다.
              </p>
            )}
            <div className="flex items-center">
              <button
                type="button"
                id="togglePasswordVisibility"
                onClick={togglePasswordVisibility}
                className="mb-5"
              />
              <label htmlFor="togglePasswordVisibility">
                {passwordVisible ? <PiEyeSlash /> : <PiEyeLight />}
              </label>
            </div>

            <Button
              type="submit"
              variant="solid"
              radius="sm"
              className="bg-black text-white text-lg  w-full"
            >
              Singup
            </Button>
          </form>
          <button onClick={handleClick}>로그인</button>
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalBody>🎉회원가입을 축합니다!🎉</ModalBody>
              <ModalFooter>
                <Button
                  className="bg-black text-white"
                  onPress={() => router.push("/login")}
                >
                  ok
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
