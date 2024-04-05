import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { LuSearch } from "react-icons/lu";
import { updatePoint } from "@/app/_api/goods/goods_api";
import { useQueryUser } from "@/app/_hooks/useQueries/user";
import { useUserPoint } from "@/app/_hooks/useQueries/goods";
import { fetchUserInfo } from "@/app/_api/mypage/mypage-api";
import { useFetchUserInfo } from "@/app/_hooks/useQueries/mypage";
// import { useUpdateUserPoint } from "@/app/_hooks/useMutations/goods";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  QUERY_KEY_USER_INFO,
  QUERY_KEY_USER_POINT,
} from "@/app/_api/queryKeys";

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: pointMutation } = useMutation({
    mutationFn: ({
      user_uid,
      updatedPoint,
    }: {
      user_uid: string;
      updatedPoint: number;
    }) => updatePoint({ user_uid, updatedPoint }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_USER_INFO] });
    },
    onError: () => {
      alert("처리에 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  // auth에서 로그인한 유저 id 가져오기
  const { data } = useQueryUser();
  const user = data?.user;
  const user_uid = user!.id;
  console.log("로그인한 유저 id : ", user_uid);

  // users 테이블에서 유저정보 가져오기
  const { data: info, isLoading: userInfo_isLoading } =
    useFetchUserInfo(user_uid);

  if (userInfo_isLoading) {
    return <div>로딩중</div>;
  }
  console.log("유저포인트 : ", info?.point);
  const user_point = info!.point;

  const handleConfirmPurchase = async () => {
    // 유저의 포인트가 클릭한 아이템의 포인트보다 작으면 구매 불가
    if (user_point < item.point) {
      alert(`구매 불가 상품입니다 : 보유한 포인트 ${user_point}P`);
      setConfirmModalOpen(false);
      onClose();
      return;
    }

    // 아니면, 유저 포인트 업데이트 (유저포인트 - 아이템의 포인트)
    try {
      const updatedPoint = user_point - item.point;
      // const { updateUserPoint } = useUpdateUserPoint()
      // await updateUserPoint({ id: user_uid, newPoint: updatedPoint });
      pointMutation({ user_uid, updatedPoint });

      alert(`구매 성공! : 남은 포인트 ${updatedPoint}P`);
      setConfirmModalOpen(false);
      onClose(); // 첫번째 모달도 같이 닫기
    } catch (error) {
      console.error("Error updating user point:", error);
      // 에러 처리
      alert("구매 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleModalClose = () => {
    setConfirmModalOpen(false);
    onClose();
  };

  return (
    <>
      <Button className="rounded-full" onPress={onOpen}>
        <LuSearch />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-center">
            제품 상세 정보
          </ModalHeader>
          <ModalBody className="text-center">
            <p>{item.product_info}</p>
          </ModalBody>
          <ModalFooter>
            <Button
              className="rounded-3xl"
              color="primary"
              onClick={() => setConfirmModalOpen(true)}
            >
              구매하기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* 구매 확인 모달 */}
      <Modal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-center">
            구매 확인
          </ModalHeader>
          <ModalBody className="text-center">
            <p>{item.point}P를 차감하고 구매하시겠습니까?</p>
          </ModalBody>
          <ModalFooter>
            <Button
              className="rounded-3xl"
              color="primary"
              onClick={handleConfirmPurchase}
            >
              구매
            </Button>
            <Button
              className="rounded-3xl"
              color="warning"
              onClick={handleModalClose}
            >
              취소
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductInfoModal;
