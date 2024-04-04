export interface ImgUploadProps {
  uploadedFileUrls: string[];
  setUploadedFileUrls: React.Dispatch<React.SetStateAction<string[]>>;
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
  recruit_number: number;
  kakao_link: string;
}

export interface FileUpload {
  files: (File | undefined)[];
  action_id: string;
}

export interface InsertImgUrls {
  action_id: string;
  imgUrlsArray: string[];
}
