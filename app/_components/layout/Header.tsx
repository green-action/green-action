"use client"; // import from "@nextui-org/react"; 시 꼭 필요

import {
  Avatar,
  Button,
  Card,
  Chip,
  CircularProgress,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Listbox,
  ListboxItem,
  Navbar,
  NavbarBrand,
  NavbarContent,
  Tab,
  Tabs,
} from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { logoutUser } from "../../_api/auth";
import { useQueryUser } from "../../_hooks/useQueries/user";

function Header() {
  const { data: session, isLoading: sessionIsLoading } = useQueryUser();
  const isLoggedIn = session?.user ? true : false;
  // true;

  // useEffect로 하면 새로고침할때마다 유저데이터 불러오기전엔 false 값이떠서 로그아웃시UI가 잠깐씩 보이는데 해결방법은없는지..
  // 로컬스토리지, 세션스토리지
  // 로그인을 하면 supabase에서 토큰이랑 유저정보를 로컬스토리지에 제공하는데 이걸 어떻게 처리해야되는지..
  // next auth? 사용해야될거같다!
  // useState으로 사용하면 최초에 실행이 안되어 새로고침해야지 결과가나옴 <  useEffect를 사용해야될거같은데...
  // 아니면  로그아웃했을때 강제로 새로고침?  location.reload()

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileHover, setIsProfileHover] = useState(false);

  const handleLogout = async () => {
    const confirmed = window.confirm("로그아웃 하시겠습니까?");
    if (confirmed) {
      try {
        await logoutUser();
        // logout();
        alert("로그아웃 되었습니다.");
        router.replace("/");
      } catch (error) {
        console.error("Logout error:", error);
      }
    } else {
      return;
    }
  };

  const pathname = usePathname();
  const router = useRouter();

  // 부모 탭의 선택 상태
  const [parentSelected, setParentSelected] = useState<string>("");

  // 하위 탭의 선택 상태
  const [childSelected, setChildSelected] = useState<string>("");

  // 부모 탭 선택 시 하위 탭 선택 상태 초기화
  const handleParentTabSelect = (key: any) => {
    setParentSelected(key);
    setChildSelected("");
  };
  const handleChildTabSelect = (key: any) => {
    setParentSelected("/individualAction");
    setChildSelected(key);
  };

  if (sessionIsLoading) {
    return (
      // 임시로 처리
      <div className="flex justify-center items-center h-40">
        <CircularProgress
          color="success"
          label="세션 정보를 가져오는 중입니다...!"
        />
      </div>
    );
  }

  return (
    <Navbar
      // shouldHideOnScroll 11rem
      className="w-full flex items-center justify-start h-[7rem] pt-10  text-[11pt]  bg-gray-200"
      // gap 등으로 조정 안돼서 margin 하드코딩으로 위치 조정
    >
      <NavbarBrand className="ml-[7rem] mr-[33%]">
        <Link href={"/"}>LOGO</Link>
      </NavbarBrand>
      <NavbarContent>
        <div className="flex flex-col items-center ">
          <Tabs
            // selectedKey={pathname}
            // selectedKey={selected}
            // onSelectionChange={setSelected}
            // key="md"
            selectedKey={parentSelected || pathname} // 선택된 부모 탭의 키 또는 경로 사용
            // size="lg"
            radius="full"
            aria-label="Options"
            color="default"
            // variant="light"
            className="flex justify-center mr-[40%] rounded-full bg-white font-bold text-[11pt] text-gray-700" // 여기에서 w넓이로 gap 넓힐 수 없고, m,gap 으로도 안됨 text-[18px]
          >
            <Tab
              key="/about"
              title="About"
              as={Link}
              href="/about"
              className="w-[10rem]  "
              onSelect={() => handleParentTabSelect("/about")}
            />
            <Tab
              as={Link}
              href="/individualAction"
              key="/individualAction"
              title="Green Action"
              className="w-[10rem] cursor-pointer "
              onMouseEnter={() => {
                setIsOpen(true);
              }}
              onMouseLeave={() => {
                setIsOpen(false);
              }}
              onSelect={() => handleParentTabSelect("/individualAction")}
            />
            <Tab
              as={Link}
              key="/community"
              title="Community"
              href="/community"
              className="w-[10rem] "
              onSelect={() => handleParentTabSelect("/community")}
            />
            <Tab
              as={Link}
              key="/goods"
              title="Goods"
              href="/goods"
              className="w-[10rem] "
              onSelect={() => handleParentTabSelect("/goods")}
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
              className="flex justify-center absolute mt-[2rem] mr-[27rem] w-[20rem] p-[1rem] text-[11pt] font-bold text-neutral-600"
            >
              <div className="flex gap-5 mt-3 px-2 py-0 items-center justify-center w-full h-[2.5rem] rounded-full bg-gray-200">
                <Link
                  href={"/individualAction"}
                  className={`rounded-full px-2 py-1 hover:bg-default-300/90 w-[10rem] text-center  ${
                    childSelected === "/individualAction" && "bg-default-300/90"
                  }`}
                  onClick={() => handleChildTabSelect("/individualAction")}
                >
                  개인과 함께해요
                </Link>
                <Link
                  href={"/groupAction"}
                  className={`rounded-full px-2 py-1 hover:bg-default-300/90 w-[10rem] text-center ${
                    childSelected === "/groupAction" && "bg-default-300/90"
                  }`}
                  onClick={() => handleChildTabSelect("/groupAction")}
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
                  <Chip className="h-[2.5rem] w-[25rem] pl-2 bg-white/60">
                    <div className="flex gap-5 items-center justify-between">
                      스파르타 Greener님 ! 환영합니다
                      {/* 닉네임 넣기 &nbsp;*/}
                      <Avatar
                        as="button"
                        className="transition-transform"
                        // color="secondary"
                        // name="Jason Hughes" // 유저 닉네임 넣기
                        size="sm"
                        showFallback
                        src=""
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
                {/* <Chip
              variant="flat"
              avatar={
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  // color="secondary"
                  // name="Jason Hughes" // 유저 닉네임 넣기
                  size="sm"
                  showFallback
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHb9zdCrQ_cBTzKMs7hfCFyzRWQ_O7qJxVbDyropTC0w&s"
                  onMouseEnter={() => {
                    setIsProfileHover(true);
                  }}
                  onMouseLeave={() => {
                    setIsProfileHover(false);
                  }}
                />
              }
            > 
            </Chip>*/}

                {/* <Avatar
              isBordered
              as="button"
              className="transition-transform"
              // color="secondary"
              // name="Jason Hughes" // 유저 닉네임 넣기
              size="sm"
              showFallback
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHb9zdCrQ_cBTzKMs7hfCFyzRWQ_O7qJxVbDyropTC0w&s"
              onMouseEnter={() => {
                setIsProfileHover(true);
              }}
              onMouseLeave={() => {
                setIsProfileHover(false);
              }}
            /> */}
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Profile Actions"
                variant="flat"
                // aria-setsize={10}
                className="w-[10rem] flex justify-center p-0 m-0 rounded-3xl "
                //bg-pink-300
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
                  <Link href={"/mypage"} className="font-bold p-1">
                    마이페이지
                  </Link>
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
                  <Link
                    href={"/"}
                    onClick={handleLogout}
                    className="font-bold p-1"
                  >
                    Logout
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </>
        ) : (
          <div className="flex ml-[3rem] gap-14 w-[20rem]">
            <Link href={"/signup"}>Sign up</Link>
            <Link href={"/login"}>Log in</Link>
          </div>
        )}
      </NavbarContent>
    </Navbar>
  );
}

export default Header;
