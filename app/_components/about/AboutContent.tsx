"use client";

import { useResponsive } from "@/app/_hooks/responsive";
import Aos from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import AboutComputerSize from "./AboutComputerSize";
import AboutMobileSize from "./AboutMobileSize";

const AboutContent = () => {
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  // parallax scroll
  const [position, setPosition] = useState(0);

  const onScroll = () => {
    setPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div>
      {isDesktop && isLaptop && <AboutComputerSize />}
      {isMobile && <AboutMobileSize />}
    </div>
  );
};

export default React.memo(AboutContent);
