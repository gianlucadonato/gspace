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
    const body = await req.json();
    const db = await getDatabase();
    const users = Users.parse(JSON.parse(body));
    console.time("exec_time");
    await saveFollowedUsers(db, users);
    console.timeEnd("exec_time");
    return Response.json({ msg: `Processed ${users.length} followed users` });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error }, { status: 400 });
    }
    return Response.json({ error }, { status: 500 });
  }
};

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: "4mb",
//     },
//   },
// };
