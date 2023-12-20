import { WithId } from "mongodb";

export interface User {
  readonly id: string;
  readonly username: string;
  readonly full_name: string;
  readonly profile_pic_url: string;
  readonly is_private: boolean;
  readonly is_verified: boolean;
  readonly followed_by_viewer: boolean;
  readonly follows_viewer: boolean;
  readonly requested_by_viewer: boolean;
  created_at?: string;
  updated_at?: string;
  followed_me_at?: string;
  unfollowed_me_at?: string;
  unfollowed_at?: string;
}

export type Report = {
  followed_by_viewer: number;
  follows_viewer: number;
  new_followed: User[];
  new_unfollowed: WithId<User>[];
  new_followers: User[];
  new_unfollowers: User[];
  created_at: string;
};
