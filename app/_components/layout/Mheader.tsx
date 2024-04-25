"use client";

import { useResponsive } from "@/app/_hooks/responsive";
import { useGetAllUnreadCount } from "@/app/_hooks/useQueries/chats";
import { useFetchUserInfo } from "@/app/_hooks/useQueries/mypage";
import { User } from "@/app/_types";
import {
  Avatar,
  Badge,
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  useDisclosure,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import ChatsListModal from "../chats/ChatsListModal";
import AlertModal from "../community/AlertModal";
import outside from "/app/_assets/image/individualAction/Group217.svg";
import SoomLoaing from "/app/_assets/image/loading/SOOM_gif.gif";
import graylogoImg from "/app/_assets/image/logo_icon/logo/gray.png";
import whitelogoImg from "/app/_assets/image/logo_icon/logo/white.png";
import { LuAlignLeft } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";
const Mheader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();
  const isLoggedIn = !!session.data;
  const user_uid = session?.data?.user.user_uid as string;

  const pathsMainAbout = pathname === "/" || pathname === "/about";
  const isAbout = pathname === "/about";

  const { data, isLoading: isUserDataLoading } = useFetchUserInfo(user_uid);
  const { display_name, profile_img } = (data as User) || "";

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileHover, setIsProfileHover] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // alert 대체 모달창을 위한 상태관리
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const [message, setMessage] = useState("");
  const { isDesktop, isLaptop, isMobile } = useResponsive();

  // 채팅방 리스트 모달창
  const {
    isOpen: isChatsListModalOpen,
    onOpen: onChatsListModalOpen,
    onClose: onChatsListModalClose,
  } = useDisclosure();

  const handleLogoLinkClick = () => {
    router.push("/");
  };

  const handleMypageLinkClick = () => {
    router.push("/mypage");
  };

  const handleLogout = async () => {
    const confirmed = window.confirm("로그아웃 하시겠습니까?");
    if (confirmed) {
      try {
        await signOut({
          redirect: false,
        });
        setMessage("로그아웃 되었습니다.");
        setIsOpenAlertModal(true);
      } catch (error) {
        console.error("Logout error:", error);
      }
    } else {
      return;
    }
  };

  const [parentSelected, setParentSelected] = useState<string>(""); // 부모 탭의 선택 상태
  const [childSelected, setChildSelected] = useState<string>(""); // 하위 탭의 선택 상태

  const handleSelectedTab = () => {
    setParentSelected(pathname);

    if (pathname !== "/individualAction" && pathname !== "/groupAction") {
      setChildSelected(""); // 해당부모탭 아닌 다른 탭 선택시 하위탭선택 없애기 (초기화)
    }
    if (pathname === "/groupAction") {
      setParentSelected("/individualAction");
      setChildSelected("/groupAction");
    }
    if (pathname.startsWith("/individualAction")) {
      // individualAction 의 detail 페이지까지 처리
      setParentSelected("/individualAction");
      setChildSelected("/individualAction");
    }
  };

  useEffect(() => {
    handleSelectedTab();
  }, [pathname]);

  // 헤더 투명이었다가 스크롤하면 블러처리
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data]);

  // 안읽은 메시지 총 개수 가져오기
  const { allUnreadCount, isAllUnreadCountLoading, isAllUnreadCountError } =
    useGetAllUnreadCount(user_uid);

  if (isAllUnreadCountLoading) {
    return (
      <div className="w-[200px] h-auto mx-auto">
        <Image className="" src={SoomLoaing} alt="SoomLoading" />
      </div>
    );
  }

  if (isAllUnreadCountError) {
    return <div>Error</div>;
  }

  return (
    <>
      {pathname !== "/signup" && pathname !== "/login" && (
        <Navbar
          disableAnimation
          shouldHideOnScroll
          isBlurred={isScrolled}
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
          className="phone:min-w-[360px] mib-h-[100px] flex bg-transparent items-center justify-center text-[11pt] mb-4"
        >
          <NavbarContent
            justify="start"
            className="desktop:hidden laptop:hidden "
          >
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              icon={<LuAlignLeft className="w-[30px] h-[30px]" />}
              className={`${
                pathname === "/" ? "text-white" : "text-[#7B7B7B]"
              } mt-5`}
            />
          </NavbarContent>
          <NavbarBrand>
            <Image
              src={
                pathname === "/about"
                  ? isScrolled
                    ? graylogoImg
                    : whitelogoImg
                  : pathname === "/"
                  ? whitelogoImg
                  : graylogoImg
              }
              alt="logo-image"
              className={`w-[74px] cursor-pointer dh-[21.63px] m-auto mt-5
            
            `}
              onClick={handleLogoLinkClick}
            />
            {/* aria-label={
                    isMenuOpen ? (
                      <IoIosArrowBack className="w-[30px] h-[30px] absolute top-4 left-2" />
                    ) : (
                      <LuAlignLeft />
                    )
                  } */}
          </NavbarBrand>
          <NavbarContent>
            <div className="flex flex-col">
              <NavbarMenu className="absolute top-0 w-[80%] h-[vh-full] z-[50] bg-white">
                <NavbarMenuToggle
                  icon={
                    <Image
                      src={outside}
                      alt="outside"
                      className="w-[20px] h-[20px] absolute top-8 text-[#343434] -scale-x-100"
                    />
                  }
                />
                <NavbarMenuItem className="text-[#454545] text-[14px] flex flex-col mt-24 absolute ml-10 top-0">
                  <Link
                    href={"/about"}
                    className="mb-11 font-bold"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  >
                    About
                    <Image
                      src={outside}
                      alt="outside"
                      className="relative bottom-4 left-[200px]"
                    />
                  </Link>

                  <Link
                    href={"/individualAction"}
                    className="mb-11 font-bold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Green Action
                    <Image
                      src={outside}
                      alt="outside"
                      className="relative bottom-4 left-[200px]"
                    />
                  </Link>
                  <Link
                    href={"/community"}
                    className="mb-11 font-bold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Community
                    <Image
                      src={outside}
                      alt="outside"
                      className="relative bottom-4 left-[200px]"
                    />
                  </Link>
                  <Link
                    href={"/goods"}
                    className="mb-11 font-bold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Goods
                    <Image
                      src={outside}
                      alt="outside"
                      className="relative bottom-4 left-[200px]"
                    />
                  </Link>
                  {isLoggedIn ? (
                    <div className="flex justify-center items-center gap-2 text-[#9C9C9C] mt-12">
                      <Avatar
                        size="md"
                        isBordered
                        name={display_name}
                        showFallback
                        src={profile_img || ""}
                      />
                      <div
                        onClick={() => {
                          handleMypageLinkClick();
                          setIsMenuOpen(false);
                        }}
                        className="p-1 cursor-pointer ml-2"
                      >
                        마이페이지
                      </div>

                      <div
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="p-1 cursor-pointer"
                      >
                        Logout
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-5 text-[13px] text-[#9C9C9C] mt-12">
                      <Link href={"/signup"}>Sign up</Link>
                      <Link href={"/login"}>Log in</Link>
                    </div>
                  )}
                </NavbarMenuItem>
              </NavbarMenu>
            </div>
            {isLoggedIn ? (
              <>
                <div className="flex gap-[25px] mt-5">
                  {/* 채팅방 badge */}
                  <Badge
                    content={
                      allUnreadCount && allUnreadCount > 0
                        ? allUnreadCount
                        : null
                    }
                    shape="circle"
                    color="default"
                  >
                    <Button
                      radius="full"
                      isIconOnly
                      aria-label="more than 99 notifications"
                      variant="light"
                      onClick={() => {
                        onChatsListModalOpen();
                      }}
                    >
                      <IoChatbubbleEllipsesOutline
                        className={`text-2xl ${
                          pathname === "/" ? "text-white" : "text-black"
                        }`}
                      />
                    </Button>
                  </Badge>
                </div>

                <div className="flex">
                  <div className="flex items-center justify-between  text-[#404040] mt-5">
                    <Avatar
                      className="transition-transform"
                      name={display_name}
                      size="sm"
                      showFallback
                      src={profile_img || ""}
                    />
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </NavbarContent>
        </Navbar>
      )}
      {isOpenAlertModal && (
        <AlertModal
          isOpen={isOpenAlertModal}
          onClose={() => {
            setIsOpenAlertModal(false);
          }}
          message={message}
        />
      )}
      {isChatsListModalOpen && (
        <ChatsListModal
          isOpen={isChatsListModalOpen}
          onOpen={onChatsListModalOpen}
          onClose={onChatsListModalClose}
          mode="header"
          action_id=""
        />
      )}
    </>
  );
};

export default Mheader;
