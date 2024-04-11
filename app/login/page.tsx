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
import kakaoimg from "../_assets/image/logo_icon/icon/login/kakao.png";
import googleimg from "../_assets/image/logo_icon/icon/login/google.png";
import logoImg from "../_assets/image/logo_icon/logo/white.png";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalPlacement, setModalPlacement] = React.useState("auto");

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

      const result = await signIn("id-password-credential", {
        id: email,
        password,
        redirect: false,
      });
      if (result?.error) {
        console.error(result.error);
        alert("로그인을 실패했습니다. 이메일과 비밀번호를 확인해주세요!");
        return;
      }

      onOpen();
    } catch (error) {
      console.error(error);
      alert("로그인을 실패했습니다. 양식을 확인해주세요");
    }
  };
  // @유저정보가 안가져와짐 수정해야함@
  // supabase 에서 소셜로그인 하면 auth테이블엔 저장됨 근데 토큰이 브라우저에서보임 그리고 토큰? 이 nextAuth랑 연결이 안되는지 로그인이안됨
  // nextAuth 로그인은 세션정보는 들어오고 기존 로컬로그인이랑 호환이되어서 로그인은됨(nextAuth로그인) 근데 supabase에 연결이안되어있어서(유저정보저장이 안되어있음)
  // 마이페이지나 댓글 이런거 이용못함 (내정보도 안뜸)
  const handleKaKakSingIn = async () => {
    signIn("kakao", {
      redirect: false,
      callbackUrl: "/",
    });
  };

  const handleGoogleSingIn = async () => {
    signIn("google", {
      redirect: false,
      callbackUrl: "/",
    });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className=" w-screen h-screen flex justify-around items-center bg-cover bg-main-img  bg-blend-darken bg-black bg-opacity-10">
      <div className="flex flex-col items-center justify-center">
        <Image
          className="w-[126px] h-[29px] cursor-pointer"
          src={logoImg}
          alt="logo"
          onClick={() => router.push("/")}
        />
      </div>
      <Card className="w-[578px] h-[655px] flex flex-col items-center justify-center bg-white rounded-3xl">
        <CardBody className="flex flex-col items-center px-8 py-8 h-full gap-5 mt-[70px]">
          <h2 className="text-2xl font-bold mb-2 text-[24px]">Login</h2>

          <form
            onSubmit={handleSingIn}
            className="w-full flex flex-col items-center "
          >
            <Input
              type="email"
              name="email"
              label="Email"
              variant="bordered"
              className="mb-5  w-[427px] h-[60px]"
            />
            <Input
              type={passwordVisible ? "text" : "password"}
              variant="bordered"
              name="password"
              label="Password"
              className="mb-5 w-[427px] h-[60px]"
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
              radius="sm"
              className="bg-black text-white text-[15px]  w-[427px] h-[40px] mt-8"
            >
              Login
            </Button>
          </form>
          <p className="text-gray-300">or</p>
          <div className="flex justify-between gap-10">
            <div className="w-[191px] h-[40px]  border-2 border-gray-200 rounded-lg flex items-center justify-center">
              <Image
                src={kakaoimg}
                alt="카카오로그인"
                onClick={handleKaKakSingIn}
                className="cursor-pointer w-[27px] h-[27px] "
              />
            </div>
            <div className="w-[191px] h-[40px]  border-2 border-gray-200 rounded-lg flex items-center justify-center">
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
