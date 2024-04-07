"use client";
import React, { useState } from "react";
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
import { useRouter } from "next/navigation";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import Image from "next/image";
import kakaoimg from "../_assets/kakao_login.png";
import Kakao from "next-auth/providers/kakao";
import { logInWithKakao } from "../_api/auth";
import { supabase } from "@/utils/supabase/client";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleSingIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      if (!email || !password) {
        alert("이메일과 비밀번호를 입력해주세요.");
        return;
      }

      await signIn("id-password-credential", {
        id: email,
        password,
        redirect: false,
      });

      onOpen();
    } catch (error) {
      alert("로그인을 실패했습니다. 이메일과 비밀번호를 확인해주세요!");
      console.error(error);
    }
  };

  const handleKaKakSingIn = async () => {
    signIn("kakao", {
      redirect: false,
      callbackUrl: "/",
    });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="bg-[#EBEBEB] w-screen h-screen flex justify-around items-center">
      <div className="flex flex-col items-center justify-center">
        <p>Logo</p>
      </div>
      <Card className="w-[500px] h-[540px] flex flex-col items-center justify-center bg-white rounded-lg">
        <CardBody className="flex flex-col items-center px-8 py-8 h-full gap-5">
          <h2 className="text-2xl font-bold mb-2">Login</h2>

          <form onSubmit={handleSingIn} className="w-full">
            <Input
              type="email"
              name="email"
              label="Email"
              size="md"
              className="mb-5  border-[BFBFBF] border-1 rounded-[12px]"
            />
            <Input
              type={passwordVisible ? "text" : "password"}
              name="password"
              label="Password"
              className="mb-5  border-[BFBFBF] border-1 rounded-[12px]"
              endContent={
                <>
                  <div className="flex items-center">
                    <button
                      type="button"
                      id="togglePasswordVisibility"
                      onClick={togglePasswordVisibility}
                      className="mb-5"
                    />
                  </div>
                  <label
                    htmlFor="togglePasswordVisibility"
                    className="flex items-center"
                  >
                    {passwordVisible ? <PiEyeSlash /> : <PiEyeLight />}
                  </label>
                </>
              }
            />

            <Button
              type="submit"
              variant="solid"
              radius="sm"
              className="bg-black text-white text-lg  w-full"
            >
              Login
            </Button>
          </form>
          <p>or</p>
          <div className="flex justify-between gap-7">
            <button>구글</button>

            <Image
              src={kakaoimg}
              alt="카카오로그인"
              onClick={handleKaKakSingIn}
              className="cursor-pointer"
            />
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
              <ModalBody>로그인 성공!</ModalBody>
              <ModalFooter>
                <Button
                  className="bg-black text-white"
                  onPress={() => router.push("/")}
                >
                  확인
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Login;
