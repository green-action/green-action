import { User as SupabaseUser } from "@supabase/auth-js";

export type User = {
  id: string;
  email?: string | undefined;
  profile_img: string | null;
  display_name: string;
  password: string;
  point: number;
  introduction: string;
};

// export interface User extends SupabaseUser {
//   id: string;
//   email: string;
//   profile_img: string | null;
//   display_name: string;
//   password: string;
//   point: number;
//   introduction: string;
// }
