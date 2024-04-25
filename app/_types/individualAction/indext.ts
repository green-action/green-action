import { Index } from "..";

export interface chatButtonProps {
  loggedInUserUid: string;
  action_id: string;
}

export interface ChildProps {
  filteredActions: Index;
  isActionsLoading: boolean;
}
