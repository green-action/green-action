// user
export const QUERY_KEY_USER = `user`;
export const QUERY_KEY_USER_INFO = `public_user_info`;
export const QUERY_KEY_USER_POINT = `user_point`;

// mypage
export const QUERY_KEY_MY_INDIVIDUALACTION = `my_individual_actions`; // queryFn은 다른데 key 통일할수있을지?
export const QUERY_KEY_MY_COMMUNITYPOST = `my_community_posts`;
export const QUERY_KEY_MY_BOOKMARK = `my_bookmarked_actions`;

// bookmark, likes
export const QUERY_KEY_BOOKMARK = `bookmark`;
export const QUERY_KEY_INDIV_ACTIONS_BOOKMARKS = `individual_actions_bookmarks`;
export const QUERY_KEY_ALLINDIVIDUALACTION = `allIndividual`;
export const QUERY_KEY_GREEN_ACTION_ALLIMAGE = `allImages`;
export const QUERY_KEY_LIKES = `likes`;
export const QUERY_KEY_COMMUNITY_POSTS_LIKES = `community_posts_likes`;

// goods
export const QUERY_KEY_GOODS = `goods`;

// group action
export const QUERY_KEY_GROUPACTION = `group_action`;

// individual action
export const QUERY_KEY_INDIVIDUALACTION = `individual_action`;
export const QUERY_KEY_INDIVIDUALACTION_FOR_EDIT = `individual_action_for_edit`;
export const QUERY_KEY_INDIVIDUALACTION_IMAGE_FILES = `individual_action_image_files`;
export const QUERY_KEY_GREEN_ACTION_IMAGE = `green_action_images`;

// community
export const QUERY_KEY_COMMUNITY_LIST_AND_POST = `community`;
export const QUERY_KEY_COMMUNITYLIST = [
  QUERY_KEY_COMMUNITY_LIST_AND_POST,
  { type: `communityList` },
];
export const QUERY_KEY_COMMUNITY_POST = [
  QUERY_KEY_COMMUNITY_LIST_AND_POST,
  { type: `communityPost` },
];
export const QUERY_KEY_COMMUNITY_POST_FOR_EDIT = `community_post_for_edit`;
export const QEURY_KEY_COMMUNITY_COMMENTS_LIST = `communityCommentsList`;
