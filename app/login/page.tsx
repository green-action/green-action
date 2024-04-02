"use client";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { signInUser } from "../_api/auth";
import { useAuthStore } from "../_store/authStore";

const Login = () => {
  const { login } = useAuthStore();

  const handleSingIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      const userData = await signInUser(email, password);
      console.log(userData);
      login(userData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-[#EBEBEB] w-screen h-screen flex justify-around items-center">
      <div className="flex flex-col items-center justify-center">
        <p>Logo</p>
      </div>
      <Card className="w-[500px] h-[550px] flex flex-col items-center justify-center bg-white rounded-lg">
        <CardBody className="flex flex-col items-center px-8 py-8 h-full gap-5">
          <h2 className="text-2xl font-bold mb-2">Login</h2>

          <form onSubmit={handleSingIn} className="w-full">
            <Input
              type="email"
              name="email"
              label="Email"
              size="md"
              className="mb-5"
            />
            <Input
              type="password"
              name="password"
              label="Password"
              className="mb-5"
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
          <button>구글</button>
          <button>카카오</button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
