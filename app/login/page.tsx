"use client";
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
import React, { useState } from "react";
import { signInUser } from "../_api/auth";
import { useAuthStore } from "../_store/authStore";
import { useRouter } from "next/navigation";

const Login = () => {
  const { login } = useAuthStore();
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
      }

      const userData = await signInUser(email, password);
      console.log(userData);
      login(userData);
      onOpen();
    } catch (error) {
      console.error(error);
      alert("로그인을 실패했습니다. 이메일과 비밀번호를 확인해주세요!");
    }
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
              type="password"
              name="password"
              label="Password"
              className="mb-5  border-[BFBFBF] border-1 rounded-[12px]"
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
          <div className="flex">
            <button>구글</button>
            <button>카카오</button>
          </div>
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
