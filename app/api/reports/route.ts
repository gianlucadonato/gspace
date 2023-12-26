import { getDatabase } from "@/lib/mongodb";
import { getReports, saveFollowedUsers } from "@/app/actions";
import { scrapeFollowedUsers } from "@/script/scrape-followed";

export const GET = async (req: Request) => {
  try {
    const db = await getDatabase();
    const reports = await getReports(db);
    return Response.json(reports);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const db = await getDatabase();
    const followedUsers = await scrapeFollowedUsers();
    console.log("🐞 > followedUsers:", followedUsers.length);
    const { users } = await saveFollowedUsers(db, followedUsers);
    return Response.json({ msg: `Processed ${users.length} followed users` });
  } catch (error) {
    console.log("🐞 > error:", error);
    return Response.json({ error }, { status: 500 });
  }
};
