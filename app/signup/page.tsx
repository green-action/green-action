"use client";
import React, { useState } from "react";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import { signUpNewUser } from "../_api/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");
  const [nickname, SetNickname] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return false;
    }
    return true;
  };

  // 회원가입 버튼
  const handleSingUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validatePasswords()) {
      return;
    }

    try {
      const user = await signUpNewUser(email, password, nickname);
      console.log(user);
      console.log("회원가입성공:", user);
    } catch (error) {
      console.error("회원가입 오류:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="bg-[#EBEBEB] w-screen h-screen flex justify-around items-center">
      <div className="flex flex-col items-center justify-center">
        <p>Logo</p>
      </div>
      <Card className="w-[500px] h-[550px] flex flex-col items-center justify-center bg-white rounded-lg">
        <CardBody className="flex flex-col items-center px-8 py-8 h-full gap-5">
          <h2 className="text-2xl font-bold mb-2">Sign up</h2>

          <form onSubmit={handleSingUp} className="w-full">
            <Input
              type="email"
              label="Email"
              size="md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-5"
            />
            <Input
              type={passwordVisible ? "text" : "password"}
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-5"
            />
            <Input
              type={passwordVisible ? "text" : "password"}
              label="ConfirmPassword"
              value={confirmPassword}
              onChange={(e) => SetConfirmPassword(e.target.value)}
              className="mb-5"
            />
            {passwordMatchError && (
              <p className="text-red-500">비밀번호가 일치하지 않습니다.</p>
            )}
            <Input
              type="text"
              label="Nickname"
              value={nickname}
              onChange={(e) => SetNickname(e.target.value)}
              className="mb-5"
            />
            <div className="flex items-center">
              <button
                type="button"
                id="togglePasswordVisibility"
                onClick={togglePasswordVisibility}
                className="mr-2"
              />
              <label htmlFor="togglePasswordVisibility">
                {passwordVisible ? <PiEyeSlash /> : <PiEyeLight />}
              </label>
            </div>

            <Button
              type="submit"
              variant="solid"
              radius="sm"
              className="bg-black text-white text-lg  w-full"
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
