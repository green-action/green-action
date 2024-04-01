"use client";
import React, { useState } from "react";
import { Button, Card, CardBody, Input } from "@nextui-org/react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, SetNickname] = useState("");
  const handleSingUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            <Input type="email" label="Email" />
            <Input type="password" label="Password" />
            <Input type="password" label="Confirm Password" />
            <Input type="text" label="Nickname" />
            <Button
              type="submit"
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
