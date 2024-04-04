export interface ProfileFileUpload {
  file: File | undefined;
  user_uid: string;
}

export interface ProfileImgUploadProps {
  uploadedFileUrl: string;
  setUploadedFileUrl: React.Dispatch<React.SetStateAction<string>>;
  file: File | undefined;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  profile_img: string;
}

export interface InsertProfileImgUrls {
  user_uid: string;
  imgUrl: string | null | undefined;
}
