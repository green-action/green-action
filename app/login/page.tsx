"use client";
import React from "react";
import { Button, Card, CardBody, Input } from "@nextui-org/react";

const Login = () => {
  const handleSingIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
  };

  return (
    <div className="bg-[#EBEBEB] w-screen h-screen flex justify-around items-center">
      <div className="flex flex-col items-center justify-center">
        <p>Logo</p>
      </div>
      <Card className="w-[500px] h-[400px] flex flex-col items-center justify-center bg-white rounded-lg">
        <CardBody className="flex flex-col items-center px-8 py-8 h-full gap-5">
          <h2 className="text-2xl font-bold mb-2">Sign in</h2>

          <form onSubmit={handleSingIn} className="w-full">
            <Input type="email" label="Email" size="md" className="mb-5" />
            <Input type="password" label="Password" className="mb-5" />

            <Button
              type="submit"
              variant="solid"
              radius="sm"
              className="bg-black text-white text-lg  w-full"
            >
              Singup
            </Button>
          </form>
          <p>회원가입</p>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
