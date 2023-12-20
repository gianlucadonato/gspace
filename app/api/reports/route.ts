import { getDatabase } from "@/lib/mongodb";

export const GET = async (req: Request) => {
  const db = await getDatabase();
  try {
    const reports = await db
      .collection("reports")
      .find({})
      .sort({ created_at: -1 })
      .toArray();

    return Response.json(reports);
  } catch (err) {
    return Response.json({ error: err }, { status: 500 });
  }
};
