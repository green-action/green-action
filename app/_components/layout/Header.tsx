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
  NavbarBrand,
  NavbarContent,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setShouldRender(true);
  }, []);

  const handleMypageLink = () => {
    router.push("/mypage");
  };

  const handleLogout = async () => {
    const confirmed = window.confirm("로그아웃 하시겠습니까?");
    if (confirmed) {
      try {
        await signOut({
          redirect: true,
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

  // if (session) {
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
    <Navbar
      className="w-full flex items-center justify-between h-[7rem] pt-10  text-[11pt]  bg-[#EBEBEB]"
      // gap 등으로 조정 안돼서 margin 하드코딩으로 위치 조정
    >
      <NavbarBrand className="ml-[10%] mr-[37%]">
        <Link href={"/"}>LOGO</Link>
      </NavbarBrand>
      <NavbarContent>
        <div className="flex flex-col items-center">
          <Tabs
            selectedKey={parentSelected} // 선택된 부모 탭의 키
            // size="lg"
            radius="full"
            aria-label="Options"
            color="default"
            // variant="light"
            className="flex justify-center mr-[33%] rounded-full bg-white font-bold text-[11pt] text-gray-700" // 여기에서 w넓이로 gap 넓힐 수 없고, m,gap 으로도 안됨 text-[18px]
          >
            <Tab
              key="/about"
              title="About"
              as={Link}
              href="/about"
              className="w-[10rem]"
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
              className="flex justify-center absolute mt-[3.2%] mr-[37%] w-[20rem] p-[1rem] text-[11pt] font-bold text-neutral-600"
            >
              <div className="flex gap-5 mt-3 px-2 py-0 items-center justify-center w-full h-[2.5rem] rounded-full bg-[#EBEBEB]">
                <Link
                  href={"/individualAction"}
                  className={`rounded-full px-2 py-1 hover:bg-default-300/90 w-[10rem] text-center  ${
                    childSelected === "/individualAction" && "bg-default-300/90"
                  }`}
                >
                  개인과 함께해요
                </Link>
                <Link
                  href={"/groupAction"}
                  className={`rounded-full px-2 py-1 hover:bg-default-300/90 w-[10rem] text-center ${
                    childSelected === "/groupAction" && "bg-default-300/90"
                  }`}
                >
                  단체와 함께해요
                </Link>
              </div>
            </div>
          )}
        </div>

        {isLoggedIn ? (
          <>
            <Dropdown
              placement="bottom-end"
              isOpen={isProfileHover}
              className="flex  m-0 rounded-3xl" //max-w-[5rem]
            >
              <DropdownTrigger>
                <div className="flex">
                  <Chip className="h-[2.5rem] w-[15rem] pl-2 bg-white/60">
                    <div className="flex gap-5 items-center justify-between">
                      {shouldRender && (
                        <>
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
                        </>
                      )}
                      {/* {display_name} Greener님 ! 환영합니다
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
                      /> */}
                    </div>
                  </Chip>
                </div>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Profile Actions"
                variant="flat"
                className="w-[10rem] flex justify-center p-0 m-0 rounded-3xl "
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
                  <div onClick={handleMypageLink} className="font-bold p-1">
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
          <div className="flex ml-[3rem] gap-14 w-[10rem]">
            <Link href={"/signup"}>Sign up</Link>
            <Link href={"/login"}>Log in</Link>
          </div>
        )}
      </NavbarContent>
    </Navbar>
  );
}

export default Header;
