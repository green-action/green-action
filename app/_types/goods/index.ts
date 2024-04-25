import { Dispatch, SetStateAction } from "react";

export interface GoodsItem {
  item: {
    id: string;
    img_url: string;
    point: number;
    product_info: string;
    product_name: string;
  };
}

export interface productInfoModalProps {
  item: GoodsItem["item"];
  showProductInfo: boolean;
  setShowProductInfo: Dispatch<SetStateAction<boolean>>;
  handleToggleProductInfo: () => void;
}
