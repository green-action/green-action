"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useResponsive } from "@/app/_hooks/responsive";
import { useGetAllUnreadCount } from "@/app/_hooks/useQueries/chats";
import { useFetchUserInfo } from "@/app/_hooks/useQueries/mypage";
import { User } from "@/app/_types";
import { debounce } from "@/utils/debounce/debounce";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarContent,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import SoomLoading from "@/app/_assets/image/loading/SOOM_gif.gif";
import graylogoImg from "@/app/_assets/image/logo_icon/logo/gray.png";
import whitelogoImg from "@/app/_assets/image/logo_icon/logo/white.png";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import ChatsListModal from "../chats/ChatsListModal";
import AlertModal from "../community/AlertModal";
import PushListModal from "../push/PushListModal";
import Mheader from "./Mheader";

const Allheader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();
  const isLoggedIn = !!session.data;
  const user_uid = session?.data?.user.user_uid as string;
  const isMypage = pathname === "/mypage";

  const {
    data,
    isLoading: isUserDataLoading,
    isError: isUserDataError,
  } = useFetchUserInfo(user_uid);
  const { display_name, profile_img } = (data as User["userInfo"]) || "";

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileHover, setIsProfileHover] = useState(false);
  const { isDesktop, isLaptop, isMobile } = useResponsive();
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const [message, setMessage] = useState("");

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
        if (isMypage) {
          router.push("/");
        }
      } catch (error) {
        console.error("Logout error:", error);
      }
    } else {
      return;
    }
  };

  const [parentSelected, setParentSelected] = useState<string>("");
  const [childSelected, setChildSelected] = useState<string>("");

  const handleSelectedTab = () => {
    setParentSelected(pathname);

    if (pathname !== "/individualAction" && pathname !== "/groupAction") {
      setChildSelected("");
    }
    if (pathname === "/groupAction") {
      setParentSelected("/individualAction");
      setChildSelected("/groupAction");
    }
    if (pathname.startsWith("/individualAction")) {
      setParentSelected("/individualAction");
      setChildSelected("/individualAction");
    }
  };

  useEffect(() => {
    handleSelectedTab();
  }, [pathname]);

  // 헤더 투명이었다가 스크롤하면 블러처리
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(
    debounce(() => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }, 100),
    [debounce],
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 안읽은 메시지 총 개수 가져오기
  const { allUnreadCount, isAllUnreadCountLoading, isAllUnreadCountError } =
    useGetAllUnreadCount(user_uid);

  if (isAllUnreadCountLoading || isUserDataLoading) {
    return (
      <div className="w-[80px] h-auto mx-auto">
        <Image className="" src={SoomLoading} alt="SoomLoading" unoptimized />
      </div>
    );
  }

  if (isAllUnreadCountError) {
    return (
      <div className="flex justify-center items-center w-screen h-[500px]">
        ❌ ERROR : 이 페이지를 표시하는 도중 문제가 발생했습니다. 다른 페이지로
        이동하시거나 다시 방문해주세요.
      </div>
    );
  }

  return (
    <>
      {(isDesktop || isLaptop) && (
        <>
          {pathname !== "/signup" && pathname !== "/login" && (
            <Navbar
              isBlurred={isScrolled}
              className="laptop:min-w-[1020px] flex bg-transparent desktop:h-[10rem] laptop:h-[104px] phone:min-w-[360px] phone:h-[100px] items-center justify-center desktop:pt-[90px] laptop:pt-[60px] desktop:mb-[88px] laptop:mb-[60px] desktop:text-[17.3px] laptop:text-[14.6px] phone:text-[11px]"
            >
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
                className={`w-[94px] cursor-pointer desktop:h-[21.63px] laptop:h-[21.63px] desktop:ml-[-40%] desktop:mr-[42%] laptop:ml-[5%] laptop:mr-[10%]`}
                onClick={handleLogoLinkClick}
              />
              <NavbarContent>
                <div className="flex flex-col items-center">
                  <Tabs
                    selectedKey={parentSelected}
                    radius="full"
                    aria-label="NavBar-Tab-Options"
                    variant="light"
                    className="flex rounded-full bg-white/30 font-bold px-0"
                    classNames={{
                      tab: "px-0 desktop:h-[40px] laptop:h-[27px]",
                      tabList:
                        "flex items-center justify-center desktop:gap-[20px] laptop:gap-[30px] desktop:h-[52px] laptop:h-[35px] desktop:min-w-[720px] laptop:min-w-[446px]", //  desktop:min-w-[750px]  d:w-[511px] h-[39px]인데 자체변경? / laptop gap 자체
                      tabContent:
                        "flex items-center justify-center text-[#2b2b2b] desktop:text-[17.3px] dekstop:h-[50px] laptop:text-[13.3px] laptop:h-[35px] desktop:min-w-[160px]", // ㅣ:text 11 자체
                    }}
                  >
                    <Tab
                      key="/about"
                      title="About"
                      as={Link}
                      href="/about"
                      className="desktop:w-[10rem] laptop:w-[96px]"
                    />
                    <Tab
                      as={Link}
                      href="/individualAction"
                      key="/individualAction"
                      title="Green Action"
                      className="desktop:w-[10rem] laptop:w-[96px]"
                      onMouseEnter={() => {
                        setIsOpen(true);
                      }}
                      onMouseLeave={() => {
                        setIsOpen(false);
                      }}
                    />
                    <Tab
                      as={Link}
                      key="/community"
                      title="Community"
                      href="/community"
                      className="desktop:w-[10rem] laptop:w-[96px]"
                    />
                    <Tab
                      as={Link}
                      key="/goods"
                      title="Goods"
                      href="/goods"
                      className="desktop:w-[10rem] laptop:w-[96px]"
                    />
                  </Tabs>
                  {isOpen && (
                    <div
                      onMouseEnter={() => {
                        setIsOpen(true);
                      }}
                      onMouseLeave={() => {
                        setIsOpen(false);
                      }}
                      className="flex justify-center absolute desktop:h-[45px] laptop:h-[35px]  desktop:mt-[2.8%] laptop:mt-[4.2%] desktop:mr-[18%] laptop:mr-[12%] desktop:pt-[23px] font-bold text-[#2b2b2b]"
                    >
                      <Navbar
                        isBlurred={false}
                        className={`flex desktop:gap-[35px] laptop:gap-[19px] desktop:mt-3 items-center justify-between desktop:w-[360px] px-0 laptop:w-[255px] desktop:h-[50px] laptop:h-[35px] rounded-full ${
                          pathname === "/"
                            ? `bg-[#E8E8E8]/30`
                            : `bg-[#E8E8E8]/80`
                        } `}
                      >
                        <Link
                          href={"/individualAction"}
                          className={`desktop:text-[17.3px] laptop:text-[13.3px] flex items-center desktop:h-[44px] laptop:h-[32px] rounded-full desktop:px-3 desktop:py-1 laptop:px-1 laptop:py-1 hover:bg-[#FFFFFF]/50 hover:border-medium hover:border-[#DDDDDD] desktop:w-[140px] laptop:w-[140px] text-center  ${
                            childSelected === "/individualAction" &&
                            "bg-[#FFFFFF]/50"
                          }`}
                        >
                          개인과 함께해요
                        </Link>
                        <Link
                          href={"/groupAction"}
                          className={`desktop:text-[17.3px] laptop:text-[13.3px] flex items-center desktop:h-[44px] laptop:h-[32px] rounded-full desktop:px-3 desktop:py-1 laptop:px-1 laptop:py-1 hover:bg-[#FFFFFF]/50 hover:border-medium hover:border-[#DDDDDD] desktop:w-[140px] laptop:w-[140px] text-center  ${
                            childSelected === "/groupAction" &&
                            "bg-[#FFFFFF]/50"
                          }`}
                        >
                          단체와 함께해요
                        </Link>
                      </Navbar>
                    </div>
                  )}
                </div>
                {isLoggedIn ? (
                  <>
                    <div className="flex desktop:gap-[35px] laptop::gap-[20px] desktop:ml-[18%] desktop:mr-[15%] laptop:ml-[2%] laptop:mr-[0%]">
                      {/* 채팅방 badge */}
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
                    </div>
                    <Dropdown
                      placement="bottom-end"
                      isOpen={isProfileHover}
                      className="flex rounded-3xl bg-[#F1F1F1]/90"
                    >
                      <DropdownTrigger>
                        <div
                          className="desktop:w-[60px] desktop:h-[75px] laptop:w-[55px] laptop:h-[55px] rounded-3xl flex items-center cursor-pointer"
                          onMouseEnter={() => {
                            setIsProfileHover(true);
                          }}
                          onMouseLeave={() => {
                            setIsProfileHover(false);
                          }}
                        >
                          <Avatar
                            className="transition-transform desktop:w-[52px] laptop:w-[38px] desktop:h-[52px] laptop:h-[38px]  desktop:ml-[0px] laptop:ml-[8px]"
                            showFallback
                            src={profile_img || ""}
                          />
                        </div>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Profile Actions"
                        variant="flat"
                        disabledKeys={["profile"]}
                        className="w-full flex justify-center p-0 m-0 rounded-3xl text-[#454545]"
                        onMouseEnter={() => {
                          setIsProfileHover(true);
                        }}
                        onMouseLeave={() => {
                          setIsProfileHover(false);
                        }}
                      >
                        <DropdownItem
                          isReadOnly
                          key="profile"
                          className="cursor-default opacity-100 text-[#404040]"
                        >
                          <span className="font-bold">{display_name}</span>{" "}
                          Greener님! <br /> 환영합니다
                        </DropdownItem>
                        <DropdownItem
                          key="mypage"
                          className="w-full h-8 rounded-3xl"
                        >
                          <div
                            onClick={handleMypageLinkClick}
                            className="font-bold p-1"
                          >
                            My Page
                          </div>
                        </DropdownItem>
                        <DropdownItem
                          key="logout"
                          color="danger"
                          className="w-full h-8 rounded-3xl  "
                        >
                          <div onClick={handleLogout} className="font-bold p-1">
                            Logout
                          </div>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </>
                ) : (
                  // 로그인 상태가 아닐 떄
                  <div
                    className={`flex desktop:gap-14 laptop:gap-[35px] desktop:w-[170px] desktop:ml-[320px] laptop:ml-[9%] ${
                      pathname === "/about"
                        ? isScrolled
                          ? "text-[#666666]"
                          : "text-white"
                        : pathname === "/"
                        ? "text-white"
                        : "text-[#666666]"
                    } font-['Pretendard-Light']`}
                  >
                    <Link href={"/signup"}>Sign up</Link>
                    <Link href={"/login"}>Log in</Link>
                  </div>
                )}
              </NavbarContent>
            </Navbar>
          )}
        </>
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
          mode={MODE_HEADER}
          action_id=""
        />
      )}
      {isMobile && <Mheader />}
    </>
  );
};

export default Allheader;
