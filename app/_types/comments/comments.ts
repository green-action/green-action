export interface AddCommentProps {
  loggedInUserUid: string;
  post_id: string;
}

export interface confirmModalProps {
  loggedInUserUid: string;
  handleInsertComment: (e: React.FormEvent) => void;
}
