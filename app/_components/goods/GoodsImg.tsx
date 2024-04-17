import { useState } from "react";
import ProductInfoModal from "./ProductInfoModal";

const GoodsImg = ({
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
  const [showProductInfo, setShowProductInfo] = useState(false);
  const handleToggleProductInfo = () => {
    setShowProductInfo(!showProductInfo);
  };

  return (
    <div>
      <div className="relative" key={item.id}>
        <img
          alt="Card background"
          className="rounded-2xl desktop:h-[494px] laptop:h-[431px] h-[441.76px] object-cover"
          src={item.img_url}
        />
        <div
          className="cursor-pointer absolute inset-0 bg-black opacity-5 rounded-2xl desktop:h-[494px] laptop:h-[431px] h-[441.76px]"
          onClick={handleToggleProductInfo}
        ></div>
        {/* 제품 이미지 하단 전체 */}
        <div
          className="flex justify-between desktop:mt-[28px] desktop:mx-[33px] desktop:mb-0
        laptop:mt-[23px] laptop:mx-[22px] laptop:mb-[160px] mt-[20px] mx-[20px] mb-[47px]"
        >
          <div className="text-[15px] ">
            <p>{item.product_name}</p>
            <p className="text-[#929292]">{item.point.toLocaleString()}P</p>
          </div>
          <div>
            <ProductInfoModal
              item={item}
              showProductInfo={showProductInfo}
              setShowProductInfo={setShowProductInfo}
              handleToggleProductInfo={handleToggleProductInfo}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoodsImg;
