"use client";
import React from "react";
import { Button, Card, CardBody, Input } from "@nextui-org/react";

const SignUp = () => {
  const handleSingUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="flex justify-between bg-[#EBEBEB]">
      <div className="flex flex-col items-center justify-center">
        <p className="flex flex-col items-center justify-center mx-auto">
          Logo
        </p>
      </div>
      <Card>
        <CardBody className="w-[500px] h-[400px] flex flex-col items-center justify-center">
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
