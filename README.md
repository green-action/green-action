## 💻 프로젝트명 < SOOM >

<br/>

<p align="center">
  <img width = "25%" src="/app/_assets/image/logo_icon/logo/gray.png" alt="logo">
</p>

<p align="center">
친환경 및 지속가능성을 추구하는 플랫폼
</p>

<br/>

## 🌏 SOOM Web Page

> 내일배움캠프 React 4기 🌏지.지.마(지구를 지킬 마스터피스)<br/>
> 개발 기간 : 2024.03.26 ~ 2024.04.14

<br/>

## 🔗 배포주소

> 정식 배포 페이지 : https://nbc-team-project-soom.vercel.app/

<br/>

## 🏃 웹개발팀 소개

|                              곽인해                              |                              조성준                              |                              서혜련                              |                              김현주                              |                              김경연                              |
| :--------------------------------------------------------------: | :--------------------------------------------------------------: | :--------------------------------------------------------------: | :--------------------------------------------------------------: | :--------------------------------------------------------------: |
| ![곽인해](https://avatars.githubusercontent.com/u/148458439?v=4) | ![조성준](https://avatars.githubusercontent.com/u/151831149?v=4) | ![서혜련](https://avatars.githubusercontent.com/u/121484282?v=4) | ![김현주](https://avatars.githubusercontent.com/u/154492235?v=4) | ![김경연](https://avatars.githubusercontent.com/u/105699149?v=4) |
|                               리더                               |                              부리더                              |                               팀원                               |                               팀원                               |                               팀원                               |
|              [@innes-k](https://github.com/innes-k)              |            [@tjdwns335](https://github.com/tjdwns335)            |         [@Hyeryeon-Seo](https://github.com/Hyeryeon-Seo)         |                [@HY965](https://github.com/HY965)                |        [@KyeongyeonKim](https://github.com/KyeongyeonKim)        |

<br/><br/>

## 🚩 프로젝트 소개

SOOM - "SOOM" 웹 서비스는 친환경 및 지속가능성을 추구하는 플랫폼으로, 사용자들이 모임을 생성하여 다양한 활동을 공유하고 참여할 수 있도록 하며, 기관 및 단체의 캠페인 정보를 제공합니다.
<br/>

- 소개
  - 사용자들이 친환경적이고 지속 가능한 활동을 공유하고 참여할 수 있는 모임을 만들 수 있습니다.
  - 환경 보호와 관련된 기관 및 단체들이 주최하는 캠페인과 이벤트에 대한 정보도 제공됩니다.
  - 사용자들이 직접 모임을 열거나 참여해 인증샷을 올리고 공유할 수 있습니다.
  - 활동 참여와 인증샷 글쓰기를 통해 포인트를 획득하여 굿즈로 교환할 수 있습니다.

<br/>

## 🛠️ 시작 가이드

### Installation

```bash
$ git clone https://github.com/green-action/green-action.git
$ cd green-action
```

<br/>

#### 환경 변수 설정

root 디렉토리에 .env 파일을 생성하고 환경변수를 입력 후 저장해주세요.

```env
NEXT_PUBLIC_SUPABASE_URL=supabase URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=supabase API Key
NEXT_PUBLIC_KAKAO_API_KEY=kakao API Key
NEXT_KAKAO_CLIENT_ID=kakao client ID
NEXT_KAKAO_CLIENT_SECRET=kakao client Key
NEXT_GOOGLE_CLIENT_ID=google client ID
NEXT_GOOGLE_CLIENT_SECRET=google client Key
```

<br/>

#### Frontend

```bash
$ cd green-action
$ yarn
$ yarn dev
```

<br/>

## 📚 Stacks

- 기본 패키지 관리자 : yarn

- FE 개발 툴 : Next.js (React 기반)

- 전역상태 관리 라이브러리 : Zustand
- 비동기 로직 서버상태관리 라이브러리 : TanStack / React-Query
- 인증/인가 및 데이터베이스 : Supabase
- CSS : Tailwind CSS, Next UI

<br/>

### 기술적 의사결정

- 문제 상황
  - Supabase에서 로그인 시 로그인 정보(token 포함)를 localstorage에 저장되어 보안에 취약해지는 문제
- 해결 방안
  - Supabase login API를 next-auth로 로그인할 수 있게 변경
- 의견 결정
  - next-auth로 바꿀 시 localstorage에 저장된 정보를 알아서 처리

<br/>

## 🗂️ 디렉토리 구조

<details>
<summary> 디렉토리 구조 </summary>
  
```
📦app
 ┣ 📂about
 ┃ ┗ 📜page.tsx
 ┣ 📂api
 ┃ ┗ 📂auth
 ┃ ┃ ┗ 📂[...nextauth]
 ┃ ┃ ┃ ┗ 📜route.ts
 ┣ 📂auth
 ┃ ┗ 📂callback
 ┃ ┃ ┗ 📜route.ts
 ┣ 📂community
 ┃ ┣ 📂detail
 ┃ ┃ ┗ 📂[id]
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┗ 📜page.tsx
 ┣ 📂goods
 ┃ ┗ 📜page.tsx
 ┣ 📂groupAction
 ┃ ┗ 📜page.tsx
 ┣ 📂individualAction
 ┃ ┣ 📂add
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂detail
 ┃ ┃ ┗ 📂[id]
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂edit
 ┃ ┃ ┗ 📂[id]
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┗ 📜page.tsx
 ┣ 📂login
 ┃ ┣ 📜page.tsx
 ┃ ┗ 📜submit-button.tsx
 ┣ 📂mypage
 ┃ ┗ 📜page.tsx
 ┣ 📂protected
 ┃ ┗ 📜page.tsx
 ┣ 📂signup
 ┃ ┗ 📜page.tsx
 ┣ 📂_api
 ┃ ┣ 📂bookmark
 ┃ ┃ ┗ 📜bookmarkQueries.ts
 ┃ ┣ 📂community
 ┃ ┃ ┣ 📜comments-api.ts
 ┃ ┃ ┣ 📜community-api.ts
 ┃ ┃ ┗ 📜communityEdit-api.ts
 ┃ ┣ 📂goods
 ┃ ┃ ┗ 📜goods_api.ts
 ┃ ┣ 📂groupAction
 ┃ ┃ ┗ 📜getGroupAction.ts
 ┃ ┣ 📂individualAction
 ┃ ┃ ┗ 📜individualAction.ts
 ┃ ┣ 📂individualAction-add
 ┃ ┃ ┗ 📜add-api.ts
 ┃ ┣ 📂individualAction-detail
 ┃ ┃ ┗ 📜detail-api.ts
 ┃ ┣ 📂individualAction-edit
 ┃ ┃ ┗ 📜edit-api.ts
 ┃ ┣ 📂main
 ┃ ┃ ┗ 📜main-api.ts
 ┃ ┣ 📂mypage
 ┃ ┃ ┣ 📜mypage-list-api.ts
 ┃ ┃ ┗ 📜mypage-profile-api.ts
 ┃ ┣ 📜auth.ts
 ┃ ┗ 📜queryKeys.ts
 ┣ 📂_assets
 ┃ ┗ 📂image
 ┃ ┃ ┣ 📂about
 ┃ ┃ ┃ ┣ 📜1.png
 ┃ ┃ ┃ ┣ 📜2.png
 ┃ ┃ ┃ ┣ 📜3.png
 ┃ ┃ ┃ ┣ 📜main.png
 ┃ ┃ ┃ ┣ 📜text-bg-1.png
 ┃ ┃ ┃ ┣ 📜text-bg-2.png
 ┃ ┃ ┃ ┗ 📜text-bg-3.png
 ┃ ┃ ┣ 📂individualAction
 ┃ ┃ ┃ ┣ 📜1.png
 ┃ ┃ ┃ ┣ 📜10.png
 ┃ ┃ ┃ ┣ 📜11.png
 ┃ ┃ ┃ ┣ 📜12.png
 ┃ ┃ ┃ ┣ 📜2.png
 ┃ ┃ ┃ ┣ 📜3.png
 ┃ ┃ ┃ ┣ 📜4.png
 ┃ ┃ ┃ ┣ 📜5.png
 ┃ ┃ ┃ ┣ 📜6.png
 ┃ ┃ ┃ ┣ 📜7.png
 ┃ ┃ ┃ ┣ 📜8.png
 ┃ ┃ ┃ ┣ 📜9.png
 ┃ ┃ ┃ ┣ 📜Group126.png
 ┃ ┃ ┃ ┣ 📜Group89.png
 ┃ ┃ ┃ ┣ 📜image166.png
 ┃ ┃ ┃ ┣ 📜image170.png
 ┃ ┃ ┃ ┣ 📜image24.png
 ┃ ┃ ┃ ┗ 📜image35.png
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┗ 📜main.png
 ┃ ┃ ┣ 📂logo_icon
 ┃ ┃ ┃ ┣ 📂icon
 ┃ ┃ ┃ ┃ ┣ 📂community
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Group 127.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Group 130.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Group 83.png
 ┃ ┃ ┃ ┃ ┃ ┗ 📜image 50.png
 ┃ ┃ ┃ ┃ ┣ 📂goods
 ┃ ┃ ┃ ┃ ┃ ┗ 📜Group 128.png
 ┃ ┃ ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┃ ┃ ┣ 📜google.png
 ┃ ┃ ┃ ┃ ┃ ┗ 📜kakao.png
 ┃ ┃ ┃ ┃ ┣ 📂mainpage
 ┃ ┃ ┃ ┃ ┃ ┗ 📜Group_124.png
 ┃ ┃ ┃ ┃ ┣ 📂mypage
 ┃ ┃ ┃ ┃ ┃ ┣ 📜.DS_Store
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Ellipse 7.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Group 100.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Group 121.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Group 131.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Group 132.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Group 133.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Group 134.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜image 127.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜image 166.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜image 168.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜image 169.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜image 55.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Rectangle 292.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Star 31.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Star 32.png
 ┃ ┃ ┃ ┃ ┃ ┗ 📜Vector 6.png
 ┃ ┃ ┃ ┃ ┗ 📜.DS_Store
 ┃ ┃ ┃ ┣ 📂logo
 ┃ ┃ ┃ ┃ ┣ 📜gray.png
 ┃ ┃ ┃ ┃ ┗ 📜white.png
 ┃ ┃ ┃ ┗ 📜.DS_Store
 ┃ ┃ ┗ 📂mainpage
 ┃ ┃ ┃ ┣ 📜.DS_Store
 ┃ ┃ ┃ ┣ 📜1.png
 ┃ ┃ ┃ ┣ 📜2.png
 ┃ ┃ ┃ ┣ 📜3.png
 ┃ ┃ ┃ ┣ 📜4.png
 ┃ ┃ ┃ ┣ 📜5.png
 ┃ ┃ ┃ ┣ 📜6.png
 ┃ ┃ ┃ ┣ 📜7.png
 ┃ ┃ ┃ ┣ 📜8.png
 ┃ ┃ ┃ ┣ 📜main.png
 ┃ ┃ ┃ ┗ 📜question_circle.png
 ┣ 📂_components
 ┃ ┣ 📂bookmark
 ┃ ┃ ┗ 📜Bookmark.tsx
 ┃ ┣ 📂community
 ┃ ┃ ┣ 📜AddComment.tsx
 ┃ ┃ ┣ 📜AddPostModal.tsx
 ┃ ┃ ┣ 📜Comment.tsx
 ┃ ┃ ┣ 📜CommunityDetailModal.tsx
 ┃ ┃ ┣ 📜CommunityListPost.tsx
 ┃ ┃ ┣ 📜EditPostModal.tsx
 ┃ ┃ ┣ 📜PointModal.tsx
 ┃ ┃ ┣ 📜PostImgEdit.tsx
 ┃ ┃ ┣ 📜PostImgUpload.tsx
 ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂customConfirm
 ┃ ┃ ┗ 📜CustomConfirm.tsx
 ┃ ┣ 📂goods
 ┃ ┃ ┣ 📜Goods.tsx
 ┃ ┃ ┗ 📜ProductInfoModal.tsx
 ┃ ┣ 📂groupAction
 ┃ ┃ ┗ 📜GroupModal.tsx
 ┃ ┣ 📂individualAction
 ┃ ┃ ┣ 📜PageList.tsx
 ┃ ┃ ┗ 📜PageTap.tsx
 ┃ ┣ 📂individualAction-add
 ┃ ┃ ┣ 📜FirstInputBox.tsx
 ┃ ┃ ┣ 📜ImgUpload.tsx
 ┃ ┃ ┣ 📜SecondInputBox.tsx
 ┃ ┃ ┗ 📜ThirdInputBox.tsx
 ┃ ┣ 📂individualAction-edit
 ┃ ┃ ┗ 📜ImgEdit.tsx
 ┃ ┣ 📂kakaoShare
 ┃ ┃ ┗ 📜KakaoShare.tsx
 ┃ ┣ 📂layout
 ┃ ┃ ┣ 📜DynamicHeader.tsx
 ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┗ 📜Test.tsx
 ┃ ┣ 📂likes
 ┃ ┃ ┗ 📜Likes.tsx
 ┃ ┣ 📂main
 ┃ ┃ ┣ 📜LaptopMainSlidder.tsx
 ┃ ┃ ┗ 📜MainSlider.tsx
 ┃ ┗ 📂mypage
 ┃ ┃ ┣ 📜MyActionCard.tsx
 ┃ ┃ ┣ 📜MyActionRecruitingModal.tsx
 ┃ ┃ ┣ 📜MyProfile.tsx
 ┃ ┃ ┣ 📜MyProfileEditModal.tsx
 ┃ ┃ ┣ 📜ProfileImgUpload.tsx
 ┃ ┃ ┗ 📜RecruitSelectTab.tsx
 ┣ 📂_hooks
 ┃ ┣ 📂responsive
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂useMutations
 ┃ ┃ ┣ 📂bookmarks
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂comments
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂community
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂goods
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┗ 📂mypage
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┗ 📂useQueries
 ┃ ┃ ┣ 📂bookmarks
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂comments
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂community
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂goods
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂groupAction
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂individualAction-edit
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂individualActions
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂main
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂mypage
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┗ 📂user
 ┃ ┃ ┃ ┗ 📜index.ts
 ┣ 📂_store
 ┃ ┣ 📜authStore.ts
 ┃ ┗ 📜responsiveStore.ts
 ┣ 📂_types
 ┃ ┣ 📂comments
 ┃ ┃ ┗ 📜comments.ts
 ┃ ┣ 📂community
 ┃ ┃ ┗ 📜community.ts
 ┃ ┣ 📂individualAction-add
 ┃ ┃ ┗ 📜individualAction-add.ts
 ┃ ┣ 📂mypage
 ┃ ┃ ┗ 📜mypage.ts
 ┃ ┗ 📜index.ts
 ┣ 📜favicon.ico
 ┣ 📜globals.css
 ┣ 📜kakao.png
 ┣ 📜layout.tsx
 ┣ 📜not-found.tsx
 ┣ 📜page.tsx
 ┗ 📜Provider.tsx
```
  
</details>

<br/>

## 🎨 와이어프레임 화면구성

|                                                       메인 페이지                                                       |                                                       About 페이지                                                       |
| :---------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------: |
| ![Home ( Main page)](https://github.com/KyeongyeonKim/Algorithm/assets/105699149/f5a07e44-84dc-4e50-abff-f451bf4d3970)  |       ![About](https://github.com/green-action/green-action/assets/105699149/5bef81af-4c2a-47ad-8aa6-ab7157109da6)       |
|                                                    **로그인 페이지**                                                    |                                                   **개인액션 페이지**                                                    |
|      ![Login](https://github.com/green-action/green-action/assets/105699149/e370161c-34c0-4215-a0cb-5c449f696723)       | ![Green-action 개인](https://github.com/green-action/green-action/assets/105699149/aee43e78-1f50-41a5-9596-7f55ed4794d9) |
|                                                   **단체액션 페이지**                                                   |                                                   **community 페이지**                                                   |
| ![Greenaction 단체](https://github.com/green-action/green-action/assets/105699149/57f24980-ff24-4fe3-b766-2487386292b3) |     ![Community](https://github.com/green-action/green-action/assets/105699149/72d28949-2292-4a1a-a674-2cd1f086e066)     |

<br/>

## ⭐️ 주요기능

#### 회원가입 / 로그인

- 이메일, 비밀번호, 닉네임을 입력하여 회원가입 할 수 있습니다.
- 카카오, 구글을 통한 소셜 로그인/회원가입도 할 수 있습니다.
- 로그인을 안 한 상태에서는 게시물의 찜 기능을 사용할 수 없습니다.

#### 메인 페이지

- 헤더의 프로필 이미지를 클릭해 마이페이지로 이동할 수 있습니다.
- 헤더의 탭을 클릭하여 About, Green-Action, Community, Goods 각 페이지로 이동할 수 있습니다.
- 메인페이지에서 Community Hot Posts를 볼 수 있습니다.
- 메인페이지에서 Green-Action Hot Posts를 볼 수 있습니다.

#### Green-Action 개인

- 오프라인 또는 온라인에서 참여 가능한 Green-Action 모집글을 작성할 수 있습니다.
- 게시글을 모집중인 캠페인 / 모집 마감된 캠페인으로 분류하여 조회할 수 있습니다.
- 최신 등록 순, 찜한 순으로 게시글을 조회할 수 있습니다.
- 게시글의 상세페이지에서 참여하기 버튼을 누르면 나오는 오픈채팅 링크를 통해 작성자와 소통할 수 있습니다.
- 게시글의 상세페이지를 카카오톡 채팅으로 공유할 수 있습니다.
- 관심이 있는 게시글에 찜 기능을 사용하여 모아 볼 수 있습니다.

#### Green-Action 단체

- 실천 가능한 환경 보호 행동들을 소개하고, 관련된 페이지로 이동할 수 있습니다.

#### 커뮤니티 페이지

- 자신이 실천한 Green-Action에 대해 작성할 수 있습니다.
- 게시글은 모달창을 통해 보여줍니다.
- 게시글에 좋아요 버튼을 누를 수 있습니다.
- 게시글에 댓글을 작성할 수 있습니다.

#### 굿즈 페이지

- 친환경 굿즈 제품들을 볼 수 있습니다.
- 자신이 적립한 포인트로 굿즈를 구매할 수 있습니다.
- 개인 Green-Action 게시글 작성, Community 게시글 작성, 댓글 등록 시 포인트가 적립됩니다.

#### 마이 페이지

- 헤더의 프로필 이미지를 눌러 마이페이지로 이동할 수 있습니다.
- 로그인 후 프로필 이미지와 사용자 이름, 자기소개를 변경할 수 있습니다.
- 자신이 작성한 Green-Action, 커뮤니티 글, 찜한 Green-Action을 볼 수 있습니다.
- 자신이 작성한 Green-Action 모집 상태를 변경할 수 있고, 글 수정 및 삭제가 가능합니다.
- 자신이 모은 포인트를 확인할 수 있습니다.

<br/>

## 🚦 트러블 슈팅

<br/>
