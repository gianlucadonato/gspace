import { Db } from "mongodb";
import { z } from "zod";
import mongoClient from "@/lib/mongodb";
import { Users } from "@/lib/schemas";
import { User, Report } from "@/types";

export const GET = async (req: Request) => {
  const db = await getDatabase();
  try {
    const followedUsers = await getFollowedUsers(db);
    return Response.json(followedUsers);
  } catch (err) {
    return Response.json({ error: err }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  const body = await req.json();
  const db = await getDatabase();
  try {
    const users = Users.parse(JSON.parse(body));
    console.time("exec_time");
    await saveFollowedUsers(db, users);
    console.timeEnd("exec_time");
    return Response.json({ msg: `Processed ${users.length} followed users` });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json({ error: err }, { status: 400 });
    }
    return Response.json({ error: err }, { status: 500 });
  }
};

export async function getFollowedUsers(db: Db) {
  const followed = await db.collection("followed").find({}).toArray();
  return followed;
}

export async function saveFollowedUsers(db: Db, users: User[]) {
  const now = new Date().toISOString();
  const report: Report = {
    followed_by_viewer: 0,
    follows_viewer: 0,
    new_followed: [],
    new_unfollowed: [],
    new_followers: [],
    new_unfollowers: [],
    created_at: now,
  };
  console.log(`🐞 > Received ${users.length} followed users`);
  for (const [idx, user] of users.entries()) {
    const followedUser = await db
      .collection("followed")
      .findOne({ id: user.id });
    report.followed_by_viewer += user.followed_by_viewer ? 1 : 0;
    report.follows_viewer += user.follows_viewer ? 1 : 0;

    if (idx % 100 === 0) {
      console.log(`🐞 > Processed ${idx + 1}/${users.length} users..`);
    }

    if (!followedUser) {
      await db.collection("followed").insertOne({ ...user, created_at: now });
      report.new_followed.push({
        ...user,
        ...(user.follows_viewer ? { followed_me_at: now } : {}),
      });
      continue;
    }

    if (followedUser.follows_viewer === user.follows_viewer) {
      await db
        .collection("followed")
        .updateOne({ id: user.id }, { $set: { ...user, updated_at: now } });
      continue;
    }

    if (followedUser.follows_viewer && !user.follows_viewer) {
      report.new_unfollowers.push(user);
      await db
        .collection("followed")
        .updateOne(
          { id: user.id },
          { $set: { ...user, updated_at: now, unfollowed_me_at: now } }
        );
    } else {
      report.new_followers.push(user);
      await db
        .collection("followed")
        .updateOne(
          { id: user.id },
          { $set: { ...user, updated_at: now, followed_me_at: now } }
        );
    }
  }

  // Update unfollowed users
  const userIds = users.map((user) => user.id);
  const unfollowed = await db
    .collection<User>("followed")
    .find({ id: { $nin: userIds } })
    .toArray();

  if (unfollowed.length) {
    await db.collection("followed").updateMany(
      { id: { $nin: userIds } },
      {
        $set: {
          followed_by_viewer: false,
          updated_at: now,
          unfollowed_at: now,
        },
      }
    );

    report.new_unfollowed = report.new_unfollowed.concat(unfollowed);
  } else {
    console.log("🐞 > No unfollowed to update.");
  }

  // Save Report
  await db.collection("reports").insertOne(report);
  console.log("🐞 > Report saved!");
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};

async function getDatabase() {
  const mongo = await mongoClient;
  const db = mongo?.db(process.env.DB_NAME);
  if (!db) {
    return Response.json(
      { error: "DB not available" },
      { status: 500, statusText: "Internal Server Error" }
    );
  }
  return db;
}
