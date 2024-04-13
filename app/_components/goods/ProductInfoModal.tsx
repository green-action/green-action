import { updatePoint } from "@/app/_api/goods/goods_api";
import { useState } from "react";
import { QUERY_KEY_USER_POINT } from "@/app/_api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserPoint } from "@/app/_hooks/useQueries/goods";
import { useSession } from "next-auth/react";
import search from "/app/_assets/image/logo_icon/icon/goods/Group 128.png";
import Image from "next/image";

const ProductInfoModal = ({
  item,
}: {
  item: {
    id: string;
    img_url: string;
    point: number;
    product_info: string;
    product_name: string;
  };
}) => {
  const queryClient = useQueryClient();
  const session = useSession();
  const loggedInUserUid = session.data?.user.user_uid;

  const [showProductInfo, setShowProductInfo] = useState(false);
  const [confirmPurchase, setConfirmPurchase] = useState(false);

  const handleToggleProductInfo = () => {
    setShowProductInfo(!showProductInfo);
  };

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
      alert("처리에 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  // 로그인된 사용자의 ID가 있는 경우에만 포인트를 가져옴
  const { data, isLoading } = loggedInUserUid
    ? useUserPoint(loggedInUserUid)
    : { data: { point: 0 }, isLoading: false };
  const user_point = data?.point || 0;

  const handleConfirmPurchase = async () => {
    if (loggedInUserUid && user_point < item.point) {
      alert(`구매 불가 상품입니다 : 보유한 포인트 ${user_point}P`);
      setConfirmPurchase(false);
      setShowProductInfo(false);
      return;
    }

    try {
      if (loggedInUserUid) {
        const updatedPoint = user_point - item.point;
        pointMutation({ loggedInUserUid, updatedPoint });

        alert(`구매 성공! : 남은 포인트 ${updatedPoint}P`);
      }
      setConfirmPurchase(false);
      setShowProductInfo(false);
    } catch (error) {
      console.error("Error updating user point:", error);
      alert("구매 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (isLoading) {
    return <div>로딩중</div>;
  }

  return (
    <div>
      <Image
        src={search}
        alt="제품상세정보"
        className="desktop:size-[33px] laptop:size-[29px] cursor-pointer"
        onClick={handleToggleProductInfo}
      />
      {showProductInfo && (
        <div
          className="absolute desktop:w-[250px] desktop:h-[270px] rounded-[20px] desktop:top-[130px] desktop:left-[40px] 
        bg-[#ffffff] laptop:w-[220px] laptop:h-[240px] laptop:top-[114px] laptop:left-[37px]"
        >
          <div className="flex flex-col gap-1 text-center m-[22px]">
            <p className="mb-[20px] text-[12px]">제품 상세 정보</p>
            <p className="text-[12px]">{item.product_info}</p>
            {loggedInUserUid && (
              <div className="flex justify-center gap-2 mt-5">
                <button
                  className="rounded-[20px] text-[13px] bg-[#EDF1E8] border-2 border-[#8A8A8A] w-[132px] h-[35px] mb-[25px]"
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
        bg-[#ffffff] laptop:w-[220px] laptop:h-[240px] laptop:top-[114px] laptop:left-[37px]"
        >
          <div className="flex flex-col gap-1 text-center m-[22px]">
            <p className="mb-[20px] text-[12px]">구매 확인</p>
            <p className="text-[12px]">
              {item.point.toLocaleString()}P를 차감하고 구매하시겠습니까?
            </p>
            <div className="flex justify-center gap-2 mt-5">
              <button
                className="rounded-[20px] text-[13px] bg-[#EDF1E8] border-2 border-[#656565] w-[91px] h-[28px]"
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
    </div>
  );
};

export default ProductInfoModal;
