import React from "react";

import titleImg from "../../app/_assets/image/about/1.png";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="relative">
      <Image
        src={titleImg}
        alt="about title image"
        className="relative top-0 w-[95%] h-[1090px] object-cover mx-auto rounded-b-[60px] brightness-50"
      />
      <div className="absolute bottom-60 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center bottom-12 text-white text-[64px] font-thin">
        <p className="">Experience the earth breathing</p>
        <p className="">together in your daily life</p>
      </div>
    </div>
  );
};

export default AboutPage;
