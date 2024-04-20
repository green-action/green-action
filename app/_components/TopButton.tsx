import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

const TopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 600) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  return (
    showButton && (
      <div className="fixed z-10 left-[3%] bottom-[5%]">
        <Button
          onClick={scrollToTop}
          size="sm"
          className=" bg-[#B3C8A1]/80 rounded-full"
        >
          Top
        </Button>
      </div>
    )
  );
};

export default TopButton;
