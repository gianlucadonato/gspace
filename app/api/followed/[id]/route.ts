import { getDatabase } from "@/lib/mongodb";
import { getFollowedUser } from "@/app/actions";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const db = await getDatabase();
    const followedUser = await getFollowedUser(db, { id: params.id });
    return Response.json(followedUser);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
};
