import { updatePoint } from "@/app/_api/goods/goods_api";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { LiaSearchSolid } from "react-icons/lia";
import { QUERY_KEY_USER_POINT } from "@/app/_api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserPoint } from "@/app/_hooks/useQueries/goods";

const ProductInfoModal = ({
  item,
  session, // 세션 정보를 전달 받음
}: {
  item: {
    id: string;
    img_url: string;
    point: number;
    product_info: string;
    product_name: string;
  };
  session: any;
}) => {
  const queryClient = useQueryClient();
  const loggedInUserUid = session.data?.user.user_uid;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

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
    if (user_point < item.point) {
      alert(`구매 불가 상품입니다 : 보유한 포인트 ${user_point}P`);
      setConfirmModalOpen(false);
      onClose();
      return;
    }

    try {
      const updatedPoint = user_point - item.point;
      pointMutation({ loggedInUserUid, updatedPoint });

      alert(`구매 성공! : 남은 포인트 ${updatedPoint}P`);
      setConfirmModalOpen(false);
      onClose();
    } catch (error) {
      console.error("Error updating user point:", error);
      alert("구매 실패했습니다. 다시 시도해주세요.");
    }
  };
  const handleModalClose = () => {
    setConfirmModalOpen(false);
    onClose();
  };

  if (isLoading) {
    return <div>로딩중</div>;
  }

  return (
    <>
      <LiaSearchSolid
        className="w-7 h-7 cursor-pointer border-1 rounded-full p-1 m-auto bg-gray-200 border-none"
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-center">
            제품 상세 정보
          </ModalHeader>
          <ModalBody className="text-center">
            <p>{item.product_info}</p>
          </ModalBody>
          <ModalFooter>
            {loggedInUserUid ? (
              <Button
                className="rounded-3xl"
                color="primary"
                onClick={() => setConfirmModalOpen(true)}
              >
                구매하기
              </Button>
            ) : null}
            {/*             
            <Button
              className="rounded-3xl"
              color="primary"
              onClick={() => setConfirmModalOpen(true)}
            >
              구매하기
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
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
