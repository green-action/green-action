"use client";

import AddPostModal from "../_components/community/AddPostModal";
import CommunityPost from "../_components/community/CommunityPost";

const CommunityListPage = () => {
  return (
    <>
      {/* 헤더 */}
      <div className="w-full h-28 bg-slate-400 mb-14">Header</div>
      {/* 전체 박스 */}
      <div className="w-[1000px] h-[100vh] mx-auto">
        {/* 정렬 */}
        <div className="flex justify-end">
          <select className="w-[120px] h-[30px] pl-4 text-sm rounded-full border-1 border-gray-300 focus:outline-none mb-4">
            <option value="정렬">정렬</option>
            <option value="최신순">최신순</option>
            <option value="좋아요순">좋아요순</option>
          </select>
        </div>
        {/* 커뮤니티 리스트 */}
        <div className="flex flex-wrap gap-4">
          {/* nextUI 카드 */}
          <CommunityPost />
        </div>
        <AddPostModal />
      </div>
    </>
  );
};

export default CommunityListPage;
