"use client";

import { useFetchUserInfo } from "@/app/_hooks/useQueries/mypage";
import { User } from "@/app/_types";
import {
  Avatar,
  Chip,
  CircularProgress,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarContent,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import logoImg from "/app/_assets/image/logo_icon/logo/gray.png";
import Image from "next/image";

function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();
  const isLoggedIn = !!session.data;
  const user_uid = session?.data?.user.user_uid as string;

  const { data, isLoading } = useFetchUserInfo(user_uid);
  const { display_name, profile_img } = (data as User) || "";

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileHover, setIsProfileHover] = useState(false);

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
          callbackUrl: "/",
        });
        alert("로그아웃 되었습니다.");
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
    if (pathname === "/individualAction") {
      setChildSelected("/individualAction");
    }
  };
  const handleChildTabSelect = (key: any) => {
    setParentSelected("/individualAction");
    setChildSelected(key);
  };

  useEffect(() => {
    handleSelectedTab();
  }, [pathname]);

  // if (isLoading) {
  //   return (
  //     // 임시로 처리
  //     <div className="flex justify-center items-center h-40">
  //       <CircularProgress
  //         color="success"
  //         label="세션 정보를 가져오는 중입니다...!"
  //       />
  //     </div>
  //   );
  // }

  return (
    <>
      {/* NOTE 메인페이지, 회원가입/로그인, about 페이지가 아닌 나머지 페이지인 경우에만 layout Header 적용 */}
      {pathname !== "/" &&
        pathname !== "/signup" &&
        pathname !== "/login" &&
        pathname !== "/about" && (
          // <div>
          <Navbar
            // NavBar 바깥에 div 두면 스크롤고정 안됨
            isBlurred={true} // TODO 스크롤내리면 isBlurred 처리
            className="min-w-[1920px] flex h-[10rem] items-center justify-center pt-[90px] mb-[200px] text-[13pt] bg-transparent"
            // gap 등으로 조정 안돼서 margin 하드코딩으로 위치 조정
          >
            <Image
              src={logoImg}
              alt="logo-image"
              className="w-[94px] h-[21.63px] ml-[-400px] mr-[430px] cursor-pointer"
              onClick={handleLogoLinkClick}
            />
            <NavbarContent>
              <div className="flex flex-col items-center">
                <Tabs
                  selectedKey={parentSelected}
                  size="lg"
                  radius="full"
                  aria-label="NavBar-Tab-Options"
                  variant="light"
                  className="flex rounded-full bg-white/30 font-bold"
                  classNames={{
                    tabList: "flex gap-[10px] h-[42px]", // w-[511px] h-[39px]인데 자체변경?
                    tabContent: "text-[#454545] text-[13pt]",
                  }}
                >
                  <Tab
                    key="/about"
                    title="About"
                    as={Link}
                    href="/about"
                    className="w-[10rem] text-black"
                  />
                  <Tab
                    as={Link}
                    href="/individualAction"
                    key="/individualAction"
                    title="Green Action"
                    className="w-[10rem] cursor-pointer"
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
                    className="w-[10rem]"
                  />
                  <Tab
                    as={Link}
                    key="/goods"
                    title="Goods"
                    href="/goods"
                    className="w-[10rem]"
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
                    className="flex justify-center absolute mt-[3.2%] mr-[17%] pt-[23px] text-[13pt]  text-[#454545]"
                  >
                    {/* 폰트크기 넓이 안맞음 / font-bold? */}
                    <Navbar
                      isBlurred={false}
                      className="flex gap-[23px] mt-3 px-0 py-0 items-center justify-center w-[345px] h-[45px] rounded-full bg-[#E8E8E8]/90  "
                      // 원래 bg-[#E8E8E8]/30
                    >
                      <Link
                        href={"/individualAction"}
                        // 안 맞아서 폰트크기 13pt에 각각 넓이 130px으로 자체적 맞춤
                        className={`rounded-full px-2 py-1 hover:bg-[#FFFFFF]/50 hover:border-medium hover:border-[#DDDDDD] w-[130px] text-center  ${
                          childSelected === "/individualAction" &&
                          "bg-[#FFFFFF]/50"
                        }`}
                      >
                        개인과 함께해요
                      </Link>
                      <Link
                        href={"/groupAction"}
                        className={`rounded-full px-2 py-1 hover:bg-[#FFFFFF]/50 hover:border-medium hover:border-[#DDDDDD] w-[130px] text-center ${
                          childSelected === "/groupAction" && "bg-[#FFFFFF]/50"
                        }`}
                      >
                        단체와 함께해요
                      </Link>
                    </Navbar>
                  </div>
                )}
              </div>

              {user_uid && isLoggedIn ? (
                <>
                  <Dropdown
                    placement="bottom-end"
                    isOpen={isProfileHover}
                    className="flex  m-0 rounded-3xl bg-[#F1F1F1]/50" //max-w-[5rem]
                  >
                    <DropdownTrigger>
                      <div className="flex">
                        {/* ml 360px / border-[#DDDDDD] - 자체변경 */}
                        <Chip className="h-[43px] w-[249px] ml-[280px] mr-[0px] bg-[#F1F1F1]/50 border-small border-[#404040]/40">
                          <div className="flex gap-[15px] items-center justify-between text-[13pt] text-[#404040]">
                            {display_name} Greener님 ! 환영합니다
                            <Avatar
                              as="button"
                              className="transition-transform"
                              name={display_name}
                              size="sm"
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
                      className="w-[10rem] flex justify-center p-0 m-0 rounded-3xl text-[#454545]"
                    >
                      <DropdownItem
                        key="mypage"
                        className="w-[8rem] h-8 rounded-3xl"
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
                        className="w-[8rem] h-8 rounded-3xl  "
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
                // text-[#454545] 로 자체설정(통일)
                <div className="flex gap-14 w-[170px] text-[#454545] font-['Pretendard-Light']  ml-[380px]">
                  <Link href={"/signup"}>Sign up</Link>
                  <Link href={"/login"}>Log in</Link>
                </div>
              )}
            </NavbarContent>
          </Navbar>
          // </div>
        )}
    </>
  );
}

export default Header;
