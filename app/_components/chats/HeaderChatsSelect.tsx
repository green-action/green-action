import { useResponsive } from "@/app/_hooks/responsive";
import { Button, ModalBody, ModalFooter } from "@nextui-org/react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import HeaderPrivateList from "./HeaderPrivateList";
import HeaderGroupList from "./HeaderGroupList";
import { useState } from "react";

const HeaderChatsSelect = ({ onClose }: { onClose: () => void }) => {
  const { isDesktop, isLaptop, isMobile } = useResponsive();
  const [privateSelected, setPrivateSelected] = useState(true);

  return (
    <>
      {/* 1:1채팅방 리스트 / 그룹채팅방 리스트 선택 */}
      <ModalBody className="p-0">
        <div className="flex w-full flex-col">
          <div className="h-screen">
            <div
              className={`${
                isDesktop
                  ? "w-full pt-[120px]"
                  : isLaptop
                  ? "w-full pt-[120px]"
                  : isMobile && "max-w-[332px] rounded-[55px] pt-[110px]"
              } fixed bg-white z-10 flex text-[20px] gap-8 h-[60px] items-end pl-11`}
            >
              <div
                className={`pb-2 cursor-pointer ${
                  privateSelected
                    ? "border-b-3 border-black font-black text-black"
                    : "text-gray-500 "
                }`}
                onClick={() => setPrivateSelected(true)}
              >
                1:1 채팅
              </div>
              <div
                className={`pb-2 cursor-pointer ${
                  !privateSelected
                    ? "border-b-3 border-black font-black text-black"
                    : "text-gray-500 "
                }`}
                onClick={() => setPrivateSelected(false)}
              >
                단체 채팅
              </div>
            </div>
            <div className="bg-[#F2F2F2] w-full h-full mt-[110px]">
              {privateSelected ? <HeaderPrivateList /> : <HeaderGroupList />}
            </div>
          </div>
        </div>
      </ModalBody>
    </>
  );
};

export default HeaderChatsSelect;
