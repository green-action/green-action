"use client";

import { useFetchUserInfo } from "@/app/_hooks/useQueries/mypage";
import { User } from "@/app/_types";
import {
  Avatar,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarContent,
  Tab,
  Tabs,
  Badge,
  Button,
  useDisclosure,
} from "@nextui-org/react";
// import { NotificationIcon } from "./NotificationIcon";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import logoImg from "/app/_assets/image/logo_icon/logo/gray.png";
import whitelogoImg from "/app/_assets/image/logo_icon/logo/white.png";
import graylogoImg from "/app/_assets/image/logo_icon/logo/gray.png";
import SoomLoaing from "/app/_assets/image/loading/SOOM_gif.gif";

import Image from "next/image";
import AlertModal from "../community/AlertModal";
import { NotificationIcon } from "../chats/NotificationIcon";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import ChatsListModal from "../chats/ChatsListModal";
import { useGetAllUnreadCount } from "@/app/_hooks/useQueries/chats";
import { useResponsive } from "@/app/_hooks/responsive";
import Mheader from "./Mheader";

function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();
  const isLoggedIn = !!session.data;
  const user_uid = session?.data?.user.user_uid as string;

  const pathsMainAbout = pathname === "/" || pathname === "/about";

  const { data, isLoading: isUserDataLoading } = useFetchUserInfo(user_uid);
  const { display_name, profile_img } = (data as User) || "";

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileHover, setIsProfileHover] = useState(false);
  const { isDesktop, isLaptop, isMobile } = useResponsive();
  // alert 대체 모달창을 위한 상태관리
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const [message, setMessage] = useState("");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  // FIXME 마이페이지에서 유저닉네임,이미지 변경 시 헤더에서 종종 바로 반영안되는 문제 (mutation으로 쿼리키 무효화해도) -> isLoading 처리했더니 에러
  // if (isUserDataLoading) {
  //   return (
  //     // 임시로 처리
  // <div className="flex justify-center items-center w-[60px] h-auto">
  //   <Image src={SoomLoading} alt="SoomLoading" />
  // </div>;
  //   );
  // }

  ////////////////////////////////////////////////////
  // 헤더 투명이었다가 스크롤하면 블러처리
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // useFetchUserInfo(user_uid);
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

  console.log("allUnreadCount", allUnreadCount);

  return (
    <>
      {(isDesktop || isLaptop) && (
        <>
          {/* NOTE 로그인/회원가입 제외 모든페이지에서 적용하도록 변경 - main, about 페이지는 pathsMainAbout 변수를 설정해 경우를 처리 (로고이미지, signUp 글자 색깔) */}
          {pathname !== "/signup" && pathname !== "/login" && (
            <Navbar
              isBlurred={isScrolled} // TODO 스크롤내리면 isBlurred 처리
              className="laptop:min-w-[1020px] flex bg-transparent desktop:h-[10rem] laptop:h-[104px] phone:min-w-[360px] phone:h-[100px] items-center justify-center desktop:pt-[90px] laptop:pt-[60px] desktop:mb-[88px] laptop:mb-[60px] desktop:text-[13pt] laptop:text-[11pt] phone:text-[11px]"
            >
              <Image
                src={
                  pathname === "/about"
                    ? isScrolled
                      ? graylogoImg // about 페이지에서 isScrolled 상태에 따라 로고 변경
                      : whitelogoImg
                    : pathname === "/" // 메인페이지에서는 항상 white로고 사용
                    ? whitelogoImg
                    : graylogoImg // 나머지 페이지에서는 항상 gray로고 사용
                }
                alt="logo-image"
                className={`w-[94px] cursor-pointer desktop:h-[21.63px] laptop:h-[21.63px] desktop:ml-[-400px]  desktop:mr-[410px]
            ${
              isLoggedIn
                ? display_name?.length >= 5
                  ? `laptop:ml-[0px] laptop:mr-[0px]`
                  : `laptop:ml-[30px] laptop:mr-[10px]`
                : `laptop:ml-[30px] laptop:mr-[100px]`
            }
            `}
                onClick={handleLogoLinkClick}
              />
              <NavbarContent>
                <div className="flex flex-col items-center">
                  <Tabs
                    selectedKey={parentSelected} // 선택된 부모 탭의 키
                    radius="full"
                    aria-label="NavBar-Tab-Options"
                    variant="light"
                    className="flex rounded-full bg-white/30 font-bold px-0"
                    classNames={{
                      tab: "px-0 desktop:h-[40px] laptop:h-[27px]",
                      tabList:
                        "flex items-center justify-center desktop:gap-[20px] laptop:gap-[30px] desktop:h-[50px] laptop:h-[35px] desktop:min-w-[720px] laptop:min-w-[446px]", //  desktop:min-w-[750px]  d:w-[511px] h-[39px]인데 자체변경? / laptop gap 자체
                      tabContent:
                        "flex items-center justify-center text-[#2b2b2b] desktop:text-[13pt] laptop:text-[10pt] laptop:h-[35px] desktop:min-w-[160px]", // ㅣ:text 11 자체
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
                      className="flex justify-center absolute desktop:h-[45px] laptop:h-[35px]  desktop:mt-[2.8%] laptop:mt-[4.2%] desktop:mr-[18%] laptop:mr-[12%] desktop:pt-[23px] desktop:text-[13pt] laptop:text-[10pt] font-bold text-[#2b2b2b]"
                    >
                      {/* 폰트크기 넓이 안맞음 */}
                      <Navbar
                        isBlurred={false}
                        className="flex desktop:gap-[23px] laptop:gap-[19px] desktop:mt-3 items-center justify-center desktop:w-[345px] laptop:w-[255px] desktop:h-[50px] laptop:h-[35px] rounded-full bg-[#E8E8E8]/30  "
                      >
                        <Link
                          href={"/individualAction"}
                          // 안 맞아서 폰트크기 13pt에 각각 넓이 130px으로 자체적 맞춤
                          className={`desktop:text-[13pt] laptop:text-[10pt] rounded-full desktop:px-2 desktop:py-1 laptop:px-1 laptop:py-1 hover:bg-[#FFFFFF]/50 hover:border-medium hover:border-[#DDDDDD] desktop:w-[130px] laptop:w-[140px] text-center  ${
                            childSelected === "/individualAction" &&
                            "bg-[#FFFFFF]/50"
                          }`}
                        >
                          개인과 함께해요
                        </Link>
                        <Link
                          href={"/groupAction"}
                          className={`desktop:text-[13pt] laptop:text-[10pt] rounded-full desktop:px-2 desktop:py-1 laptop:px-1 laptop:py-1 hover:bg-[#FFFFFF]/50 hover:border-medium hover:border-[#DDDDDD] desktop:w-[130px] laptop:w-[140px] text-center ${
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
                    <div
                      className={`flex gap-[25px] ${
                        display_name?.length >= 5
                          ? `desktop:ml-[30px] laptop:ml-[5px]`
                          : `desktop:ml-[80px] laptop:ml-[10px]`
                      } `}
                    >
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
                          <IoChatbubbleEllipsesOutline className="text-2xl" />
                        </Button>
                      </Badge>
                    </div>
                    {/* 임시 - UT 후 추가 예정 */}
                    {/* push알림 badge */}
                    {/* <Badge content="0" shape="circle" color="default">
                  <Button
                    radius="full"
                    isIconOnly
                    aria-label="more than 99 notifications"
                    variant="light"
                  >
                    <NotificationIcon size={24} height={24} width={24} />
                  </Button>
                </Badge> */}
                    <Dropdown
                      placement="bottom-end"
                      isOpen={isProfileHover}
                      className="flex rounded-3xl bg-[#F1F1F1]/50"
                    >
                      <DropdownTrigger>
                        <div className="flex">
                          {/* ml 360px  ml-[280px] mr-[0px] / border-[#DDDDDD] - 자체변경 */}
                          <Chip
                            className={`desktop:w-[249px] laptop:w-[162px] desktop:h-[50px] laptop:h-[34px] bg-[#F1F1F1]/50 border-small border-[#404040]/40
                        desktop:ml-[20px] laptop:ml-[15px]
                        `}
                            //
                            //   ? `desktop:ml-[10px] laptop:ml-[5px]`
                            //   : `desktop:ml-[10px] laptop:ml-[60px]`
                            // ? `desktop:ml-[120px] laptop:ml-[10px]`
                            // : `desktop:ml-[200px] laptop:ml-[60px]`
                          >
                            <div className="flex desktop:gap-[15px] items-center justify-between desktop:text-[13pt] laptop:text-[10pt] text-[#404040]">
                              <p>
                                {display_name} Greener님
                                <span className="desktop:contents laptop:hidden">
                                  ! 환영합니다
                                </span>
                              </p>
                              <Avatar
                                as="button"
                                className="transition-transform desktop:w-[39px] laptop:w-[28px] desktop:h-[39px] laptop:h-[28px]  desktop:ml-[0px] laptop:ml-[8px]"
                                name={display_name}
                                // size="sm"
                                showFallback
                                src={profile_img || ""}
                                onMouseEnter={() => {
                                  setIsProfileHover(true);
                                }}
                                onMouseLeave={() => {
                                  setIsProfileHover(false);
                                }}
                              />
                            </div>
                          </Chip>
                        </div>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Profile Actions"
                        variant="flat"
                        className="w-full flex justify-center p-0 m-0 rounded-3xl text-[#454545]"
                      >
                        <DropdownItem
                          key="mypage"
                          className="w-full h-8 rounded-3xl"
                          onMouseEnter={() => {
                            setIsProfileHover(true);
                          }}
                          onMouseLeave={() => {
                            setIsProfileHover(false);
                          }}
                        >
                          <div
                            onClick={handleMypageLinkClick}
                            className="font-bold p-1"
                          >
                            마이페이지
                          </div>
                        </DropdownItem>
                        <DropdownItem
                          key="logout"
                          color="danger"
                          className="w-full h-8 rounded-3xl  "
                          onMouseEnter={() => {
                            setIsProfileHover(true);
                          }}
                          onMouseLeave={() => {
                            setIsProfileHover(false);
                          }}
                        >
                          <div onClick={handleLogout} className="font-bold p-1">
                            Logout
                          </div>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </>
                ) : (
                  <div
                    className={`flex desktop:gap-14 laptop:gap-[35px] desktop:w-[170px] desktop:ml-[320px] laptop:ml-[102px] ${
                      // pathsMainAbout ? "text-white " : "text-[#666666]"
                      pathname === "/about"
                        ? isScrolled
                          ? "text-[#666666]" // about 페이지에서 isScrolled 상태에 따라 글자색 변경
                          : "text-white"
                        : pathname === "/" // 메인페이지에서는 항상 글자색 white
                        ? "text-white"
                        : "text-[#666666]" // 나머지 페이지에서는 항상 글자색 gray
                    } font-['Pretendard-Light']`}
                  >
                    <Link href={"/signup"}>Sign up</Link>
                    <Link href={"/login"}>Log in</Link>
                  </div>
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
      )}
      {isMobile && <Mheader />}
    </>
  );
}

export default Header;
