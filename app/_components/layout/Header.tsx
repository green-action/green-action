"use client"; // import from "@nextui-org/react"; 시 꼭 필요

import {
  Avatar,
  Button,
  Card,
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
  // useEffect로 하면 새로고침할때마다 유저데이터 불러오기전엔 false 값이떠서 로그아웃시UI가 잠깐씩 보이는데 해결방법은없는지..
  // 로컬스토리지, 세션스토리지
  // 로그인을 하면 supabase에서 토큰이랑 유저정보를 로컬스토리지에 제공하는데 이걸 어떻게 처리해야되는지..
  // next auth? 사용해야될거같다!
  // useState으로 사용하면 최초에 실행이 안되어 새로고침해야지 결과가나옴 <  useEffect를 사용해야될거같은데...
  // 아니면  로그아웃했을때 강제로 새로고침?  location.reload()

  const [isOpen, setIsOpen] = useState(false);

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
  // TODO 하위 탭 선택 시의 문제 해결하기

  // const [selected, setSelected] = useState("/");

  // 부모 탭의 선택 상태
  const [parentSelected, setParentSelected] = useState(null);

  // 하위 탭의 선택 상태
  const [childSelected, setChildSelected] = useState<string | null>(null);

  // 부모 탭 선택 시 하위 탭 선택 상태 초기화
  const handleParentTabSelect = (key: any) => {
    setParentSelected(key);
    // setChildSelected(null); // 부모 탭이 선택될 때 하위 탭의 선택 상태 초기화
    // if (key !== "/groupAction") {
    //   setChildSelected(null); // 부모 탭이 '단체와 함께해요'가 아닌 경우에만 하위 탭의 선택 상태 초기화
    // }
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
    // <div className="flex items-center justify-between mx-[5rem] h-[10rem]">
    <Navbar
      shouldHideOnScroll
      className="flex items-center justify-center h-[8rem]"
    >
      <NavbarBrand>
        <Link href={"/"}>LOGO</Link>
      </NavbarBrand>
      <NavbarContent>
        <div className="flex flex-col items-center justify-center text-[18px]">
          {/* <Dropdown
            isOpen={isOpen}
            // className="absolute top-[5rem] left-[30rem]   "
            // className="bg-red-300 ml-[30rem] w-10"
          >
            <DropdownTrigger>
              <Button className="hidden"></Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Static Actions"
              onMouseEnter={() => {
                setIsOpen(true);
              }}
              onMouseLeave={() => {
                setIsOpen(false);
              }}
              className="rounded-2xl"
            >
              <DropdownItem key="new" className="rounded-2xl">
                New file
              </DropdownItem>
              <DropdownItem key="new" className="rounded-2xl">
                New file
              </DropdownItem>
            </DropdownMenu>
          </Dropdown> */}

          <Tabs
            // selectedKey={pathname}
            // selectedKey={selected}
            // onSelectionChange={setSelected}
            // key="md"
            selectedKey={parentSelected || pathname} // 선택된 부모 탭의 키 또는 경로 사용
            // size="md"
            radius="full"
            aria-label="Options"
            color="default"
            variant="light"
            className="flex justify-center rounded-full bg-gray-200/50 text-[18px]" // 여기에서 w넓이로 gap 넓힐 수 없고, m,gap 으로도 안됨
            // onSelectionChange={(value: any) => {
            //   console.log("The value is", value);
            //   router.push(value);
            // }}
          >
            <Tab
              key="/about"
              title="About"
              as={Link}
              href="/about"
              className="w-[10rem]"
              onSelect={() => handleParentTabSelect("/about")}
            />
            {/* <Tab
              as={Link}
              href="/individualAction"
              key="/individualAction"
              // defaultSelectedKey={`/individualAction`} //안됨
              // onSelect={() => {
              //   setSelected(true);
              // }}
              title="Green Action"
              className="w-[10rem] flex justify-center"
              onSelect={(key) => handleParentTabSelect(key)}
            /> */}
            {/* <Tabs
              // key="md"
              title="Green-Action"
              size="md"
              radius="full"
              aria-label="green-action-sub-nav"
              color="default"
              className="flex w-[20rem]"
              selectedKey={childSelected || pathname} // 선택된 하위 탭의 키 또는 경로 사용4\
              // onSelectionChange={() => {}}
              // onSelectionChange={(key: any) => {
              //   key === '/groupAction' ?
              // }}
              // selectedKey={pathname}
              // selectedKey={selected}
              // onSelectionChange={setSelected}
              // defaultSelectedKey={`/individualAction`}
            > */}
            <Tab
              as={Link}
              href="/individualAction"
              key="/individualAction"
              // defaultSelectedKey={`/individualAction`} //안됨
              // onSelect={() => {
              //   setSelected(true);
              // }}
              title="Green Action"
              className="w-[10rem]"
              onMouseEnter={() => {
                setIsOpen(true);
              }}
              onMouseLeave={() => {
                setIsOpen(false);
              }}

              // onClick={() => {
              //   setIsOpen(true);
              // }}
              // onSelect={(key) => handleParentTabSelect(key)}
            ></Tab>

            {/* <Tab
                // as={Link}
                href="/individualAction"
                key="/individualAction"
                title="개인과 함께해요"
                className="w-[10rem]"
                onSelect={() => setChildSelected("/individualAction")}
              />
              <Tab
                as={Link}
                href="/groupAction"
                key="/groupAction"
                title="단체와 함께해요"
                className="w-[10rem]"
                onSelect={() => setChildSelected("/groupAction")}
              />*/}
            {/* </Tabs> */}
            {/* </Tab> */}
            <Tab
              as={Link}
              key="/community"
              title="Community"
              href="/community"
              className="w-[10rem]"
              onSelect={() => handleParentTabSelect("/community")}
            />
            <Tab
              as={Link}
              key="/goods"
              title="Goods"
              href="/goods"
              className="w-[10rem]"
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
              className="flex justify-center absolute mt-[5rem] mr-14 w-[25rem] p-[1rem]"
              //  #f4f4f5 #616162
            >
              {/* <Listbox
                className="absolute"
                aria-label="Actions"
                // onAction={(key) => alert(key)}
              >
                <ListboxItem key="new">New file</ListboxItem>
                <ListboxItem key="new">New file</ListboxItem>
              </Listbox> */}
              <div className="flex gap-10 mt-6 px-2 py-1 items-center justify-center w-full h-[3rem] rounded-full bg-gray-200/50">
                <Link
                  href={"/individualAction"}
                  className="rounded-full px-2 py-1 hover:bg-default-300/90 w-[10rem] text-center"
                >
                  개인과 함께해요
                </Link>
                <Link
                  href={"/groupAction"}
                  className="rounded-full px-2 py-1 hover:bg-default-300/90 w-[10rem] text-center"
                >
                  단체와 함께해요
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-10">
          {/* 임시: 로그인상태에 따라 수정예정 */}
          {isLoggedIn ? (
            <>
              <Link href={"/"} onClick={handleLogout}>
                Logout
              </Link>
              <Link href={"/mypage"}>
                <Avatar showFallback src="" size="md" />
              </Link>
            </>
          ) : (
            <>
              <Link href={"/signup"}>Sign up</Link>
              <Link href={"/login"}>Log in</Link>
            </>
          )}
        </div>
      </NavbarContent>
      {/* </div> */}
    </Navbar>
  );
}

export default Header;
