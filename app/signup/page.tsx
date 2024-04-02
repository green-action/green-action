"use client";
import React, { useState } from "react";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { signUpNewUser } from "../_api/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");
  const [nickname, SetNickname] = useState("");

  const handleSingUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await signUpNewUser(email, password, nickname);
      console.log("회원가입성공:", user);
    } catch (error) {
      console.error("회원가입 오류:", error);
    }
  };

  return (
    <div className="bg-[#EBEBEB] w-screen h-screen flex justify-between items-center">
      <div className="flex flex-col items-center justify-center">
        <p>Logo</p>
      </div>
      <Card className="w-[500px] h-[400px] flex flex-col items-center justify-center bg-white rounded-lg">
        <CardBody className="flex flex-col items-center justify-between px-8 py-8 h-full">
          <h2 className="text-2xl font-bold mb-2">Sign up</h2>

          <form onSubmit={handleSingUp} className="w-full">
            <Input
              type="email"
              label="Email"
              size="md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type="password"
              label="ConfirmPassword"
              value={confirmPassword}
              onChange={(e) => SetConfirmPassword(e.target.value)}
            />
            <Input
              type="text"
              label="Nickname"
              value={nickname}
              onChange={(e) => SetNickname(e.target.value)}
            />

            <Button
              type="submit"
              variant="solid"
              radius="sm"
              className="bg-black text-white text-lg rounded-sm w-full"
            >
              Singup
            </Button>
          </form>
          <p>로그인</p>
        </CardBody>
      </Card>
    </div>
  );
};

export default SignUp;
