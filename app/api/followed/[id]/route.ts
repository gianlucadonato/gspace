import { Db } from "mongodb";
import { getDatabase } from "@/lib/mongodb";
import { User } from "@/types";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const db = await getDatabase();
  try {
    const followedUser = await getFollowedUser(db, { id: params.id });
    return Response.json(followedUser);
  } catch (err) {
    return Response.json({ error: err }, { status: 500 });
  }
};

export async function getFollowedUser(db: Db, query: any) {
  const followed = await db.collection<User>("followed").findOne(query);
  return followed;
}
