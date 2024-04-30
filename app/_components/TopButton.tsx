import { useEffect, useState } from "react";
import Image from "next/image";
import upImg from "../../app/_assets/image/mainpage/up.png";

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
      <div
        className={`fixed z-10 desktop:right-[35px] desktop:bottom-[150px] laptop:right-[35px] laptop:bottom-[150px]
            phone:right-[32px] phone:bottom-[90px]`}
      >
        <Image
          src={upImg}
          alt="윗쪽 방향 화살표"
          onClick={scrollToTop}
          className="cursor-pointer hover:scale-105 ease-in-out duration-300 desktop:w-[50px] laptop:w-[50px] phone:w-[25px]"
        />
      </div>
    )
  );
};

export default TopButton;
