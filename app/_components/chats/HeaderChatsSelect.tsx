import { useState } from "react";
import { useResponsive } from "@/app/_hooks/responsive";
import { ModalBody } from "@nextui-org/react";
import HeaderPrivateList from "./HeaderPrivateList";
import HeaderGroupList from "./HeaderGroupList";

const HeaderChatsSelect = () => {
  const { isDesktop, isLaptop, isMobile } = useResponsive();
  const [privateSelected, setPrivateSelected] = useState(true);

  return (
    <>
      <ModalBody className="p-0">
        <div className="flex w-full flex-col">
          <div className="h-screen">
            <div
              className={`${
                isDesktop
                  ? "w-full h-[130px]"
                  : isLaptop
                  ? "w-full h-[80px]"
                  : isMobile && "w-[332px] h-[55px] rounded-t-[30px]"
              } fixed bg-white z-10 flex text-[20px] gap-8 items-end pl-11`}
            >
              <div
                className={`pb-2 cursor-pointer 
                ${
                  isDesktop &&
                  (privateSelected
                    ? "border-b-3 border-black font-semibold text-black"
                    : "text-gray-500")
                }
                ${
                  isLaptop &&
                  (privateSelected
                    ? "border-b-2 border-black font-semibold text-black text-base"
                    : "text-gray-500 text-base")
                }
                ${
                  isMobile &&
                  (privateSelected
                    ? "border-b-2 border-black font-semibold text-black text-sm"
                    : "text-gray-500 text-sm")
                } 
                `}
                onClick={() => setPrivateSelected(true)}
              >
                1:1 채팅
              </div>
              <div
                className={`pb-2 cursor-pointer 
                ${
                  isDesktop &&
                  (!privateSelected
                    ? "border-b-3 border-black font-semibold text-black"
                    : "text-gray-500")
                }
                ${
                  isLaptop &&
                  (!privateSelected
                    ? "border-b-2 border-black font-semibold text-black text-base"
                    : "text-gray-500 text-base")
                }
                ${
                  isMobile &&
                  (!privateSelected
                    ? "border-b-2 border-black font-semibold text-black text-sm"
                    : "text-gray-500 text-sm")
                } 
                `}
                onClick={() => setPrivateSelected(false)}
              >
                단체 채팅
              </div>
            </div>
            <div
              className={`bg-[#F2F2F2] w-full h-[120%] ${
                isDesktop
                  ? "mt-[17%]"
                  : isLaptop
                  ? "mt-[15%]"
                  : isMobile && "mt-[15%]"
              }`}
            >
              {privateSelected ? <HeaderPrivateList /> : <HeaderGroupList />}
            </div>
          </div>
        </div>
      </ModalBody>
    </>
  );
};

export default HeaderChatsSelect;
