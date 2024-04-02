import { useLikes, useQueryUser } from "@/app/_hooks/useQueries/bookmarks";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

const Likes = () => {
  const { data, isLoading } = useLikes();
  const { data: user } = useQueryUser();

  // const user_uid = user?.user_metadata.user_uid;
  const user_uid = "6f971b1e-abaf-49d5-90e7-f8c6bfe4bd58";
  return (
    <div>
      <CiHeart />
      <FaHeart />
    </div>
  );
};

export default Likes;
