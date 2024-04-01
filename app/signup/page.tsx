"use client";
import React from "react";
import { Button, Input } from "@nextui-org/react";

const SignUp = () => {
  const handleSingUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Sign up</h2>
      <article className="w-[500px] h-[400px]">
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
