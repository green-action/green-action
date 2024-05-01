import { Dispatch, SetStateAction } from "react";

export interface MainTextProps {
  position: number;
  setPosition: Dispatch<SetStateAction<number>>;
}
