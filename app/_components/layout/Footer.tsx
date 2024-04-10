import React from "react";

import Image from "next/image";
import Link from "next/link";

import logoImg from "/app/_assets/image/logo_icon/logo/gray.png";

const Footer = () => {
  return (
    <footer className="flex flex-col w-full h-[506px] pt-[115px] pl-[185px] pr-[186px] bg-[#F6F6F6]">
      <div className="flex items-center justify-between">
        <Image
          src={logoImg}
          alt="logo-image"
          className="w-[94px] h-[21.63px] "
        />
        <div className="flex gap-[75px] text-[13pt] text-[#454545]">
          <Link href={"/about"}>About</Link>
          <Link href={"/individualAction"}>Green Action</Link>
          <Link href={"/community"}>Community</Link>
          <Link href={"/goods"}>Goods</Link>
        </div>
      </div>
      <div className="pt-[257px]">
        <p className="font-['Pretendard-Light'] text-[12pt] text-[#6E6E6E]">
          ⓒ 2024 SOOM All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
