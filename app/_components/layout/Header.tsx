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
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Image from "next/image";
import logoImg from "/app/_assets/image/logo_icon/logo/gray.png";

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
      {pathname !== "/signup" && pathname !== "/login" && (
        <Navbar
          isBlurred={true} // TODO 스크롤내리면 isBlurred 처리
          className="laptop:min-w-[1020px] flex bg-transparent desktop:h-[10rem] laptop:h-[104px] items-center justify-center desktop:pt-[90px] laptop:pt-[60px] desktop:mb-[88px] laptop:mb-[60px] desktop:text-[13pt] laptop:text-[11pt]"
          // gap 등으로 조정 안돼서 margin 하드코딩으로 위치 조정
        >
          <Image
            src={logoImg}
            alt="logo-image"
            className="desktop:w-[94px] laptop:w-[94px] desktop:h-[21.63px] laptop:h-[21.63px] desktop:ml-[-400px] laptop:ml-[10px] desktop:mr-[460px] laptop:mr-[135px] cursor-pointer"
            onClick={handleLogoLinkClick}
          />
          <NavbarContent>
            <div className="flex flex-col items-center">
              <Tabs
                selectedKey={parentSelected} // 선택된 부모 탭의 키
                size="lg"
                radius="full"
                aria-label="NavBar-Tab-Options"
                variant="light"
                className="flex rounded-full bg-white/30 font-bold" // + 볼드체
                classNames={{
                  tabList:
                    "flex items-center desktop:gap-[10px] laptop:gap-[30px] desktop:h-[42px] laptop:h-[35px] desktop:w-[600px] laptop:w-[446px]", // d:w-[511px] h-[39px]인데 자체변경? / laptop gap 자체
                  tabContent:
                    "flex items-center text-[#454545] desktop:text-[13pt] laptop:text-[11pt]", // ㅣ:text 11 자체
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
                  className="flex justify-center absolute desktop:mt-[3.2%] laptop:mt-[4.0%] desktop:mr-[15%] laptop:mr-[12%] desktop:pt-[23px] desktop:text-[13pt] laptop:text-[10pt] font-bold text-[#454545]"
                >
                  {/* 폰트크기 넓이 안맞음 */}
                  <Navbar
                    isBlurred={false}
                    className="flex desktop:gap-[23px] laptop:gap-[19px] desktop:mt-3 items-center justify-center desktop:w-[345px] laptop:w-[255px] desktop:h-[42px] laptop:h-[35px] rounded-full bg-[#E8E8E8]/30  "
                  >
                    <Link
                      href={"/individualAction"}
                      // 안 맞아서 폰트크기 13pt에 각각 넓이 130px으로 자체적 맞춤
                      className={`rounded-full desktop:px-2 desktop:py-1 laptop:px-1 laptop:py-1 hover:bg-[#FFFFFF]/50 hover:border-medium hover:border-[#DDDDDD] desktop:w-[130px] laptop:w-[140px] text-center  ${
                        childSelected === "/individualAction" &&
                        "bg-[#FFFFFF]/50"
                      }`}
                    >
                      개인과 함께해요
                    </Link>
                    <Link
                      href={"/groupAction"}
                      className={`rounded-full desktop:px-2 desktop:py-1 laptop:px-1 laptop:py-1 hover:bg-[#FFFFFF]/50 hover:border-medium hover:border-[#DDDDDD] desktop:w-[130px] laptop:w-[140px] text-center ${
                        childSelected === "/groupAction" && "bg-[#FFFFFF]/50"
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
                <Dropdown
                  placement="bottom-end"
                  isOpen={isProfileHover}
                  className="flex rounded-3xl bg-[#F1F1F1]/50"
                >
                  <DropdownTrigger>
                    <div className="flex">
                      {/* ml 360px  ml-[280px] mr-[0px] / border-[#DDDDDD] - 자체변경 */}
                      <Chip
                        className={`desktop:w-[249px] laptop:w-[162px] desktop:h-[42px] laptop:h-[35px] bg-[#F1F1F1]/50 border-small border-[#404040]/40 ${
                          display_name?.length >= 5
                            ? `desktop:ml-[210px]`
                            : `desktop:ml-[290px] `
                        } `}
                      >
                        <div className="flex desktop:gap-[15px] items-center justify-between desktop:text-[13pt] text-[#404040]">
                          <p>
                            {display_name} Greener님{` `}
                            <span className="desktop:contents laptop:hidden">
                              ! 환영합니다
                            </span>
                          </p>
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
              <div className="flex desktop:gap-14 laptop:gap-[35px] desktop:w-[170px] desktop:ml-[380px] laptop:ml-[102px] text-white font-['Pretendard-ExtraLight'] ">
                <Link href={"/signup"}>Sign up</Link>
                <Link href={"/login"}>Log in</Link>
              </div>
            )}
          </NavbarContent>
        </Navbar>
      )}
    </>
  );
}

export default Header;
