import { getDatabase } from "@/lib/mongodb";
import { getReports } from "@/app/actions";

export const GET = async (req: Request) => {
  try {
    const db = await getDatabase();
    const reports = await getReports(db);
    return Response.json(reports);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
};
