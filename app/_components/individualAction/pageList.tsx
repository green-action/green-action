import {
  useActionAllImages,
  useAllIndividualAction,
} from "@/app/_hooks/useQueries/individualActions";
import { Card, Chip } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { CiStar, CiUser } from "react-icons/ci";
import { ImLocation } from "react-icons/im";
import { MdDateRange } from "react-icons/md";
import Bookmark from "../bookmark/Bookmark";

interface ChildProps {
  action_id: string;
  id: string;
  activeTab: string;
}

const PageList: React.FC<ChildProps> = ({ action_id, id, activeTab }) => {
  const router = useRouter();
  // const { user } = useAuthStore();

  const { data: individualAction, isLoading, Error } = useAllIndividualAction();
  // console.log(individualAction);

  const {
    data: imgsUrl,
    isLoading: imgurlLoading,
    isError: imgurlError,
  } = useActionAllImages(id);
  console.log(imgsUrl);

  const handleClick = (id: any) => router.push(`/detail/${id}`);

  return (
    <div className="mt-12 gap-10 grid grid-cols-1 md:grid-cols-4 p-2 ">
      {individualAction?.map((post) => (
        <article key={post.id}>
          <Card
            onClick={() => handleClick(post.id)}
            isFooterBlurred
            radius="lg"
            className="border-none w-[300px] h-[240px] mb-3 "
          >
            <img
              alt="Post Image"
              className="object-cover w-full h-[198px] cursor-pointer"
              src=""
            />
          </Card>
          <div className=" max-w-[100%] relative">
            <div className="flex gap-4 mt-4  border-white/20 border-1 max-w-[70%]">
              <h4 className="font-bold text-md">
                {/* {(post.title?.length as any) > 10
                  ? `${post.title?.substring(0, 10)}...`
                  : post.title} */}
                {post.title}
              </h4>
              <Chip
                size="sm"
                color={`${post.is_recruiting ? "success" : "default"}`}
                className="text-white"
              >
                {post.is_recruiting ? "모집중" : "마감됨"}
              </Chip>
            </div>
            <div className="flex items-center gap-1 mt-4 border-b border-gray-300  max-w-[70%]">
              <MdDateRange />
              <small className="text-default-500">
                {post.start_date} - {post.end_date}
              </small>
            </div>
            <div className="flex items-center gap-1 mt-4 ">
              <ImLocation color="black" />
              <small className="text-default-500">{post.location}</small>
            </div>
            <div className="flex justify-end absolute top-0 right-0 gap-2">
              <div className="flex items-center">
                <CiUser />
                <span className="ml-1 text-sm"> {post.recruit_number} </span>
              </div>
              <div className="flex items-center">
                {/* <Bookmark action_id={post.id} /> */}
                <CiStar />
                <span className="ml-1 text-sm"> 3 </span>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default PageList;
