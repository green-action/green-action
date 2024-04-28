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
> 개발 기간 : 2024.03.26 ~ 2024.04.30 (5주 간)

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

"SOOM" - 환경 보호와 관련된 모임을 사용자들이 직접 오픈하고, 모임에 참여한 내용을 인증샷으로 공유할 수 있는 커뮤니티 사이트입니다.
<br/>

- 상세 소개
  - "SOOM" 서비스는 친환경 및 지속가능성을 추구하는 플랫폼입니다.
  - 환경 보호와 관련된 기관 및 단체의 캠페인과 이벤트 정보를 제공합니다.
  - 사용자들이 친환경적이고 지속 가능한 활동을 공유하고 참여할 수 있는 모임을 만들 수 있습니다.
  - 모임에 참여했던 인증샷을 커뮤니티를 통해 올리고, 경험을 공유할 수 있습니다.
  - 활동 참여와 인증샷 글쓰기 등의 방법을 통해 포인트를 획득하여 굿즈로 교환할 수 있습니다.

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
NEXTAUTH_SECRET=next auth secret Key
NEXT_PUBLIC_KAKAO_MAP_API_KEY=kakao map API Key
```

<br/>

#### Frontend

```bash
$ cd green-action
$ yarn
$ yarn dev
```

<br/>

## 🧩 Architecture

<img src="/app/_assets/image/readme/Architecture.png" alt="architecture" width="100%" margin-left=""/>

<br/>

## 📚 Stacks

### ✔️ Language & Framework

<img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white"><img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white"><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">

### ✔️ State management

<img src="https://img.shields.io/badge/zustand-orange?style=for-the-badge&logo=zustand&logoColor=white"><img src="https://img.shields.io/badge/Tanstack Query-FF4154?style=for-the-badge&logo=TanstackQuery&logoColor=white">

### ✔️ authentication

<img src="https://img.shields.io/badge/nextauth-191919?style=for-the-badge&logo=nextauth&logoColor=black">

### ✔️ Design System & Style

<img src="https://img.shields.io/badge/nextui-000000?style=for-the-badge&logo=nextui&logoColor=white"><img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">

### ✔️ Database

<img src="https://img.shields.io/badge/supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white"><img src="https://img.shields.io/badge/supabase realtime-004088?style=for-the-badge&logo=realtime&logoColor=white">

<br/>

## 📝 기술적 의사결정

<details>
<summary>Typescript</summary>

| 👍🏻 Typescript                                                                                                                                                                                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \- 명확한 타입 시스템을 통해 휴먼에러와 컴파일 시간에 미리 타입 오류를 발견할 수 있어 런타임 오류를 줄이고 코드의 안정성을 높일 수 있습니다. 이를 통해 팀의 협업이 더욱 원활해질 수 있기 때문에 TypeScript를 선택하였습니다. |

</details>

<details>
<summary>Next.js</summary>

- SEO를 위한 다양한 렌더링 기법(SSR, ISR, SSG)을 통해 사용자가 필요로 할 때까지 모든 리소스를 한꺼번에 로드하지 않고, 필요한 시점에 필요한 부분만을 로드하여 초기 로딩 시간을 단축하고 페이지의 성능을 향상시킬 수 있습니다.

- 이미지 최적화와 레이지로딩을 제공하는 등 페이지 로딩 속도를 최적화할 수 있는 기능을 제공합니다.

- app route를 통한 간편한 라우팅 설정과 미들웨어를 통한 페이지 접근 제어 등 다양한 기능을 제공하여 개발 효율성을 높일 수 있습니다.

</details>

<details>
<summary>Next Auth VS Supabase Authentication</summary>

| 👍🏻 **Next Auth**                                                                                                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \- 간편하고 효율적인 세션 및 JWT(토큰) 기반 인증을 통해 사용자 인증, 로그인, 회원가입 등의 기능을 구현할 수 있습니다.<br />\- 국내 사용자가 가장많은 네이버 및 카카오 OAuth Provider를 지원하여 소셜 로그인 기능을 손쉽게 추가할 수 있습니다. |
| ❌ **Supabase authentication**                                                                                                                                                                                                                |
| \- storage에 유저의 정보 및 토큰 값이 자동으로 저장되기 때문에 보안에 취약다는 단점이 명확하여 next auth로 리팩토링을 진행했습니다.                                                                                                           |

</details>

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

<details>
<summary>FormData - '이 호출과 일치하는 오버로드가 없습니다'</summary>

- **📝 문제** : formData를 인자로 받아 supabase 테이블에 insert하는 과정에서 계속 '이 호출과 일치하는 오버로드가 없습니다' 타입 에러 발생

![](https://velog.velcdn.com/images/innes_kwak/post/f9e41089-a034-4404-a204-6720b0080ef3/image.png)

- **🔨 시도**

  - `FormDataType`을 따로 만들기

  ```ts
  export interface FormDataType {
    user_uid: string;
    title: string;
    content: string;
    start_date: string;
    end_date: string;
    location: string;
    recruit_number: string;
    kakao_link: string;
  }
  ```

  - `inputData`타입을 `String()`으로 지정해주기

  ```ts
  const inputData: FormDataType = {
    user_uid: currentUserUId,
    title: String(formData.get("activityTitle")),
    content: String(formData.get("activityDescription")),
    start_date: String(formData.get("startDate")),
    end_date: String(formData.get("endDate")),
    location: String(formData.get("activityLocation")),
    // ⭐️ recruit_number는 'number'타입인데 계속 string으로 지정하고 있었던게 최종 원인!
    recruit_number: String(formData.get("maxParticipants")),
    kakao_link: String(formData.get("openKakaoLink")),
  };
  ```

- **💙 원인** : supabase 테이블의 타입과 코드상에서 입력한 타입이 일치하지 않아서 발생한 문제!

  (전형적인 휴먼 에러 였다. )

  ![](https://velog.velcdn.com/images/innes_kwak/post/c600c66b-dc38-49bf-904d-ff221a4fceb5/image.png)

- **🧡 해결**

  - `FormDataType`에서 `recruit_number`타입을 `number`로 수정
  - `inputData`에서도 강제로 `String()`해준 `recruit_number`를 `Number()`로 수정

</details>

<br/>

<details>

<summary>화면에서 요소가 화면너비를 넘어가는 이슈</summary>

- **📝 문제** : 디자인 가이드를 `1920px`짜리 하나만 받아놨는데, 막상 구현해보니 브라우저 상 100%에서 이렇게 잘리는 이슈가 발생했다.

  ![](https://velog.velcdn.com/images/innes_kwak/post/8eb91eab-32f5-497d-84dc-01f32431e100/image.png)

- **💙 원인**

  - 디자인 가이드가 `화면 너비에 따라(브레이크 포인트에 따라) 3가지`가 있어야 하는데, 팀원들도 디자이너도 반응형 웹 구현이 처음이라 이 사실을 몰랐던 것이다.

    (`참고` : 브레이크 포인트에 따라 디자인 가이드가 2가지가 될 수도, 4가지 이상이 될 수도 있다.)

  - ex) `1920px`, `1020(or 1080)px`, `360px`

    -> `4px`, `8px` 단위로 제작하는게 일반적

- **🧡 해결**

  - `1020px`, `360px`에 따른 디자인 가이드를 추가로 받기로 디자이너와 협의

  - 반응형 구현 예시 코드

  ```tsx
  // 컴포넌트에서 작성 예시

   <div className="desktop:mt-[700px] laptop:mt-[550px] flex flex-col items-center">
  ```

  ```ts
  // tailwind.config 파일에서 화면 너비 지정

    theme: {
    screens: {
      phone: "360px",
      laptop: "1020px",
      desktop: "1920px",
    },
  ```

</details>

<br/>
