export interface MyAction {
  id: string;
  content: string | null;
  created_at: string;
  end_date: string | null;
  is_recruiting?: boolean;
  location: string | null;
  recruit_number: number | null;
  start_date: string | null;
  title: string | null;
  user_uid: string | null;
  actionImgUrls: string[];
  bookmarkedAction: {
    id: string;
    content: string | null;
    created_at: string;
    end_date: string | null;
    is_recruiting: boolean;
    location: string | null;
    recruit_number: number | null;
    start_date: string | null;
    title: string | null;
    user_uid: string | null;
    actionImgUrls: string[];
  };
}

export interface ProfileFileUpload {
  file: File | undefined;
  user_uid: string;
}

export interface ProfileImgUploadProps {
  uploadedFileUrl: string;
  setUploadedFileUrl: React.Dispatch<React.SetStateAction<string>>;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}

export interface InsertProfileImgUrls {
  user_uid: string;
  imgUrl: string | null | undefined;
}
