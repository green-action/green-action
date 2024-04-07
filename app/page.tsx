"use client";

import { Chip } from "@nextui-org/react";
import Link from "next/link";
import MainSlider from "./_components/main/MainSlider";

const MainPage = () => {
  // const { data: communityPostsLikes, isLoading } =
  //   useFetchCommunityPostsLikes();

  // const communityPostsByLikes = communityPostsLikes?.sort(
  //   (a, b) => b.communityLikes.length - a.communityLikes.length,
  // );

  return (
    <div className="flex flex-col min-h-[2600px]">
      <section className="flex w-full h-[500px] justify-center items-end">
        <p className="text-[4rem] w-[1000px] m-10">
          {/* bg-lime-300 */}
          EXPERIENCE A NEW WAY <br />
          OF GREEN LIFE
        </p>
      </section>

      {/* <p className="">
        EXPERIENCE A NEW WAY OF GREEN LIFEEXPERIENCE A NEW WAY OF GREEN
        LIFEEXPERIENCE A NEW WAY OF GREEN LIFEEXPERIENCE A NEW WAY OF GREEN
        LIFEEXPERIENCE A NEW{" "}
      </p> */}
      <section className="flex flex-col items-center gap-[5rem] m-[5rem] mt-[20rem] ">
        {/* <div className="flex flex-col items-center gap-[5rem]"> */}
        <Chip
          classNames={{
            base: "h-[40px] p-1 bg-gradient-to-br from-[#A1BA9D] to-pink-300 border-small border-white/50 shadow-pink-500/30",
            content:
              "w-[200px]  text-[13pt]  drop-shadow shadow-black text-white text-center",
            // h-[20px]
          }}
        >
          Community Hot Posts
        </Chip>
        {/* <div className="flex flex-wrap gap-8"> */}
        <div className="w-full flex justify-end ">
          <Link
            href={`/community`}
            className="text-gray-500 text-sm mr-5"
          >{`전체보기 > `}</Link>
        </div>
      </section>
      <section className="mx-[5rem]">
        <MainSlider mode="community" />
      </section>
      <section className="flex flex-col items-center gap-[5rem] m-[5rem] mt-[20rem] ">
        <Chip
          classNames={{
            base: "h-[40px] p-1 bg-gradient-to-br from-[#A1BA9D] to-pink-300 border-small border-white/50 shadow-pink-500/30",
            content:
              "w-[210px] text-[13pt]  drop-shadow shadow-black text-white text-center",
          }}
        >
          Green-Action Hot Posts
        </Chip>
        <div className="w-full flex justify-end">
          <Link
            href={`/individualAction`}
            className="text-gray-500 text-sm mr-5"
          >{`전체보기 > `}</Link>
        </div>
      </section>
      <section className="mx-[5rem]">
        <MainSlider mode="action" />
      </section>
      {/* </section> */}
    </div>
  );
};

export default MainPage;
