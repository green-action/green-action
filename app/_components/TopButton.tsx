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
      <div className="fixed z-10 right-[8%] bottom-[7%]">
        <Button
          onClick={scrollToTop}
          size="sm"
          className="w-[5px] bg-gray-500/20 rounded-full"
        >
          Top
        </Button>
      </div>
    )
  );
};

export default TopButton;
