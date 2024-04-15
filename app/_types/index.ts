import { Session } from "next-auth";

export type User = {
  id: string;
  email?: string | undefined;
  profile_img: string | null;
  display_name: string;
  password: string;
  point: number;
  introduction: string;
  sub: string;
};

export type Index =
  | {
      content: string | null;
      created_at: string;
      end_date: string | null;
      id: string;
      is_recruiting: boolean | null;
      kakao_link: string | null;
      location: string | null;
      recruit_number: number | null;
      start_date: string | null;
      title: string | null;
      user_uid: string | null;
      actionImgUrls: { img_url: string }[];
      actionBookmarks: { id: string }[];
    }[]
  | undefined;

export interface kakaoUser {
  sub: number;
  email: string;
  name: string;
  avatar_url: string;
}
