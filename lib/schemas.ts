import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  full_name: z.string(),
  profile_pic_url: z.string().url(),
  is_private: z.boolean(),
  is_verified: z.boolean(),
  followed_by_viewer: z.boolean(),
  follows_viewer: z.boolean(),
  requested_by_viewer: z.boolean(),
});

export const Users = z.array(UserSchema);
