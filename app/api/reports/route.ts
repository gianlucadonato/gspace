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
    const { users } = await saveFollowedUsers(db, followedUsers);
    return Response.json({ msg: `Processed ${users.length} followed users` });
  } catch (error) {
    console.log("🐞 > error:", JSON.stringify(error, null, 2));
    return Response.json({ error }, { status: 500 });
  }
};
