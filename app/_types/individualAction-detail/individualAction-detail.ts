export interface placeCoordinateType {
  x: string;
  y: string;
  placeId: string;
  placeName: string;
}

export interface searchMapModalProps {
  setActivityLocationMap: React.Dispatch<React.SetStateAction<string>>;
  locationMapRef: React.MutableRefObject<placeCoordinateType | null>;
}

export interface KakaoShareButtonProps {
  description: string;
}
