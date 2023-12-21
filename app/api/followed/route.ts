import { z } from "zod";
import { getDatabase } from "@/lib/mongodb";
import { Users } from "@/lib/schemas";
import { getFollowedUsers, saveFollowedUsers } from "../../actions";

export const GET = async (req: Request) => {
  try {
    const db = await getDatabase();
    const followedUsers = await getFollowedUsers(db);
    return Response.json(followedUsers);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    console.time("exec_time");
    const body = await req.json();
    const users = Users.parse(body);
    const db = await getDatabase();
    await saveFollowedUsers(db, users);
    console.timeEnd("exec_time");
    return Response.json({ msg: `Processed ${users.length} followed users` });
  } catch (error) {
    console.log("🐞 > error:", error);
    if (error instanceof z.ZodError) {
      return Response.json({ error }, { status: 400 });
    }
    return Response.json({ error }, { status: 500 });
  }
};
