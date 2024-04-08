import React, { useEffect } from "react";
import { IoShareSocialOutline } from "react-icons/io5";

type KakaoShareButtonProps = {
  description: string;
};

const KakaoShareButton = ({ description }: KakaoShareButtonProps) => {
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
      <IoShareSocialOutline className="w-11 h-11 cursor-pointer border-1 rounded-full p-2 m-auto" />
    </div>
  );
};

export default KakaoShareButton;
