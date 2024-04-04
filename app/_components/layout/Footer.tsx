import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-[10rem] w-full h-[18rem] p-[5rem]">
      <div className="flex items-center justify-between">
        <div>
          <Link href={"/"}>LOGO</Link>
        </div>
        <div className="flex gap-[5rem] text-sm">
          <Link href={"/about"}>About</Link>
          <Link href={"/individualAction"}>Green Action</Link>
          <Link href={"/community"}>Community</Link>
          <Link href={"/goods"}>Goods</Link>
        </div>
      </div>
      <div>
        <p className="text-xs">ⓒ 2024 All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
