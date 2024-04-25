import { placeCoordinateType } from "../individualAction-detail/individualAction-detail";

export interface ImgUploadProps {
  uploadedFileUrls: string[];
  setUploadedFileUrls: React.Dispatch<React.SetStateAction<string[]>>;

  setFiles: React.Dispatch<React.SetStateAction<(File | undefined)[]>>;
}

export interface ImgUpdateProps {
  uploadedFileUrls: { id: string; img_url: string }[];
  setUploadedFileUrls: React.Dispatch<
    React.SetStateAction<{ id: string; img_url: string }[]>
  >;
  deleteFileIds: string[];
  setDeleteFileIds: React.Dispatch<React.SetStateAction<string[]>>;
  files: (File | undefined)[];
  setFiles: React.Dispatch<React.SetStateAction<(File | undefined)[]>>;
}

export interface FormDataType {
  user_uid: string;
  title: string;
  content: string;
  start_date: string;
  end_date: string;
  location: string;
  location_map: {
    x: number | string;
    y: number | string;
    placeId: string;
    placeName: string;
  } | null;
  recruit_number: number;
}

export interface FileUpload {
  files: (File | undefined)[];
  action_id: string;
}

export interface InsertImgUrls {
  action_id: string;
  imgUrlsArray: string[];
}

export interface mapResultPropsType {
  searchKeyword: string;
  setActivityLocation: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
  locationMapRef: React.MutableRefObject<placeCoordinateType | null>;
}

export interface placeDataType {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

export interface firstInputBoxProps {
  activityLocation: string;
  setActivityLocation: React.Dispatch<React.SetStateAction<string>>;
  handleActivityLocationChange: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  locationMapRef: React.MutableRefObject<placeCoordinateType | null>;
  activityLocationMap: string;
  setActivityLocationMap: React.Dispatch<React.SetStateAction<string>>;
}
