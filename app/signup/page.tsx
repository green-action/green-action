"use client";
import React from "react";
import { Button, Input } from "@nextui-org/react";

const SignUp = () => {
  const handleSingUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="flex justify-between">
      <div className="flex flex-col items-center justify-center">
        <p className="flex flex-col items-center justify-center mx-auto">
          Logo
        </p>
      </div>
      <article className="w-[600px] h-[400px] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-2">Sign up</h2>
        <form onSubmit={handleSingUp}>
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
      </article>
    </div>
  );
};

export default SignUp;
