import { auth } from "@/auth";
import { scrapeFollowedUsers } from "@/script/scrape-followed";

export const POST = auth(async (req) => {
  if (!req.auth) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }
  const followedUsers = await scrapeFollowedUsers();
  return Response.json(followedUsers);
});
