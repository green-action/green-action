import HeaderPage from "@/components/header/HeaderPage";
import { supabase } from "@/utils/supabase/client";
import { getServerSession } from "next-auth";

const Header = async () => {
  const session = await getServerSession();
  const isLoggedIn = !!session;

  if (session?.user) {
    const { data: existingUser, error: existingUserError } = await supabase
      .from("users")
      .select("id")
      .eq("email", session.user.email);
    if (existingUser && existingUser.length > 0) {
      session.user.user_uid = existingUser[0].id;
    }
  }

  console.log("session 정보==>", session);
  console.log("isLoggedIn 정보==>", isLoggedIn);
  return <HeaderPage isLoggedIn={isLoggedIn} session={session} />;
};

export default Header;
