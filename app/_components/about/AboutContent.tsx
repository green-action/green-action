"use client";

import { useResponsive } from "@/app/_hooks/responsive";
import { debounce } from "@/utils/debounce/debounce";
import Aos from "aos";
import "aos/dist/aos.css";
import React, { useCallback, useEffect, useState } from "react";
import AboutComputerSize from "./AboutComputerSize";
import AboutMobileSize from "./AboutMobileSize";

const AboutContent = () => {
  const { isMobile } = useResponsive();

  // parallax scroll
  const [position, setPosition] = useState(0);

  const onScroll = useCallback(
    debounce(() => {
      setPosition(window.scrollY);
    }, 100),
    [debounce],
  );

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
      {isMobile ? (
        <AboutMobileSize position={position} />
      ) : (
        <AboutComputerSize position={position} />
      )}
    </div>
  );
};

export default React.memo(AboutContent);
