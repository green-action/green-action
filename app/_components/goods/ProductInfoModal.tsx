import { updatePoint } from "@/app/_api/goods/goods_api";
import { QUERY_KEY_USER_POINT } from "@/app/_api/queryKeys";
import { useUserPoint } from "@/app/_hooks/useQueries/goods";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import AlertModal from "../community/AlertModal";
import search from "/app/_assets/image/logo_icon/icon/goods/Group 128.png";

import type { productInfoModalProps } from "@/app/_types/goods";

const ProductInfoModal: React.FC<productInfoModalProps> = ({
  item,
  showProductInfo,
  setShowProductInfo,
  handleToggleProductInfo,
}) => {
  const queryClient = useQueryClient();
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid;

  const [confirmPurchase, setConfirmPurchase] = useState(false);

  // alert 대체 모달창을 위한 상태관리
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const [message, setMessage] = useState("");

  const { mutate: pointMutation } = useMutation({
    mutationFn: ({
      loggedInUserUid,
      updatedPoint,
    }: {
      loggedInUserUid: string;
      updatedPoint: number;
    }) => updatePoint({ loggedInUserUid, updatedPoint }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_USER_POINT] });
    },
    onError: () => {
      setMessage("처리에 오류가 발생했습니다. 다시 시도해주세요.");
      setIsOpenAlertModal(true);
    },
  });

  // 로그인된 사용자의 ID가 있는 경우에만 포인트를 가져옴
  const { data, isLoading } = loggedInUserUid
    ? useUserPoint(loggedInUserUid)
    : { data: { point: 0 }, isLoading: false };
  const user_point = data?.point || 0;

  const handleConfirmPurchase = async () => {
    if (loggedInUserUid && user_point < item.point) {
      setMessage(`구매 불가 상품입니다 : 보유한 포인트 ${user_point}P`);
      setIsOpenAlertModal(true);

      // Error: Rendered more hooks than during the previous render.
      setConfirmPurchase(false);
      setShowProductInfo(false);
      return;
    }

    try {
      if (loggedInUserUid) {
        const updatedPoint = user_point - item.point;
        pointMutation({ loggedInUserUid, updatedPoint });

        setMessage(`구매 성공! : 남은 포인트 ${updatedPoint}P`);
        setIsOpenAlertModal(true);
      }
    } catch (error) {
      console.error("Error updating user point:", error);

      setMessage("구매 실패했습니다. 다시 시도해주세요.");
      setIsOpenAlertModal(true);
    } finally {
      setConfirmPurchase(false);
      setShowProductInfo(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-auto">
        {/* <Image src={SoomLoaing} alt="SoomLoading" unoptimized /> */}
      </div>
    );
  }

  return (
    <div>
      <Image
        src={search}
        alt="제품상세정보"
        className="desktop:size-[33px] laptop:size-[29px] size-[33px] cursor-pointer"
        onClick={handleToggleProductInfo}
      />
      {showProductInfo && (
        <div
          className="absolute grid content-between desktop:w-[250px] desktop:h-[270px] rounded-[20px] desktop:top-[130px] desktop:left-[40px] 
        bg-[#ffffff] laptop:w-[218px] laptop:h-[240px] laptop:top-[114px] laptop:left-[37px]
        w-[218px] h-[255px] top-[112px] left-[39px]"
        >
          <div className="flex flex-col gap-1 text-center desktop:m-[22px] laptop:m-[13px] mx-[13px] mt-[24px]">
            <p className="desktop:mb-[45px] laptop:mb-[37px] mb-[37px] text-[11px] font-bold">
              제품 상세 정보
            </p>
            <p className="text-[11px] leading-[160%] desktop:w-[212px] laptop:w-[195px]">
              {item.product_info}
            </p>
          </div>
          <div className="desktop:mx-[22px] desktop:mb-[22px] laptop:mx-[13px] laptop:mb-[13px] mx-[13px] mb-[13px]">
            {loggedInUserUid && (
              <div className="flex justify-center">
                <button
                  className="rounded-[20px] font-semibold text-[11px] text-[#fff] bg-[#000] desktop:w-[132px] desktop:h-[35px] laptop:w-[115px] laptop:h-[31px] w-[115px] h-[31px] bottom-[22px]"
                  onClick={() => setConfirmPurchase(true)}
                >
                  구매하기
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {confirmPurchase && (
        <div
          className="absolute desktop:w-[250px] desktop:h-[270px] rounded-[20px] desktop:top-[130px] desktop:left-[40px] 
        bg-[#ffffff] laptop:w-[220px] laptop:h-[240px] laptop:top-[114px] laptop:left-[37px] w-[218px] h-[255px] top-[112px] left-[39px]"
        >
          <div className="flex flex-col gap-1 text-center m-[22px] mt-[103px]">
            <p className="desktop:w-[212px] laptop:w-[184px] w-[184px] text-[11px] mb-[60px]">
              {item.point.toLocaleString()}P를 차감하고 구매하시겠습니까?
            </p>
            <div className="flex justify-center gap-2">
              <button
                className="rounded-[20px] font-semibold text-[11px] text-[#fff] bg-[#000] w-[91px] h-[28px]"
                onClick={handleConfirmPurchase}
              >
                구매
              </button>
              <button
                className="rounded-[20px] text-[13px] border-2 border-[#656565] w-[91px] h-[28px]"
                onClick={() => {
                  setConfirmPurchase(false);
                  setShowProductInfo(false);
                }}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
      {isOpenAlertModal && (
        <AlertModal
          isOpen={isOpenAlertModal}
          onClose={() => setIsOpenAlertModal(false)}
          message={message}
        />
      )}
    </div>
  );
};

export default ProductInfoModal;
