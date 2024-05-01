export interface PlaceCoordinateType {
  x: string;
  y: string;
  placeId: string;
  placeName: string;
}

export interface SearchMapModalProps {
  setActivityLocationMap: React.Dispatch<React.SetStateAction<string>>;
  locationMapRef: React.MutableRefObject<PlaceCoordinateType | null>;
}

export interface KakaoShareButtonProps {
  description: string;
}

export interface KakaoMapProps {
  placeInfo: PlaceCoordinateType;
}
