import Image from "next/image";
import React, { useEffect } from "react";
import share from "/app/_assets/image/logo_icon/icon/mypage/Group 134.png";

type KakaoShareButtonProps = {
  description: string;
};

const KakaoShareButton: React.FC<KakaoShareButtonProps> = ({ description }) => {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { Kakao } = window;

      if (!Kakao.isInitialized()) {
        Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
      }
    }
  }, []);

  const handleShare = () => {
    const { Kakao } = window;

    Kakao.Share.sendDefault({
      objectType: "text",
      text: description,
      link: {
        mobileWebUrl: shareUrl,
        webUrl: shareUrl,
      },
    });
  };

  return (
    <div onClick={handleShare}>
      <Image
        src={share}
        alt="공유하기"
        className="size-[55.71px] cursor-pointer"
      />
    </div>
  );
};

export default KakaoShareButton;
