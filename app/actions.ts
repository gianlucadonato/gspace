import { Db } from "mongodb";
import { Report, User } from "@/types";

export async function getReports(db: Db) {
  const reports = await db
    .collection("reports")
    .find({})
    .sort({ created_at: -1 })
    .toArray();
  return reports;
}

export async function getFollowedUser(db: Db, query: any) {
  const followed = await db.collection<User>("followed").findOne(query);
  return followed;
}

export async function getFollowedUsers(db: Db) {
  const followed = await db.collection("followed").find({}).toArray();
  return followed;
}

export async function saveFollowedUsers(db: Db, users: User[]) {
  if (!Array.isArray(users)) {
    throw new Error("Invalid users list");
  }

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
    const oldUser = await db.collection("followed").findOne({ id: user.id });
    report.followed_by_viewer += user.followed_by_viewer ? 1 : 0;
    report.follows_viewer += user.follows_viewer ? 1 : 0;

    if (idx % 100 === 0) {
      console.log(`🐞 > Processed ${idx + 1}/${users.length} users..`);
    }

    if (!oldUser) {
      await db.collection("followed").insertOne({ ...user, created_at: now });
      report.new_followed.push({
        ...user,
        ...(user.follows_viewer ? { followed_me_at: now } : {}),
      });
      continue;
    }

    if (oldUser.follows_viewer === user.follows_viewer) {
      const newUser = { ...user, updated_at: now };
      if (oldUser.followed_by_viewer !== user.followed_by_viewer) {
        newUser.unfollowed_at = now;
        report.new_unfollowed.push(newUser);
      }
      await db
        .collection("followed")
        .updateOne({ id: user.id }, { $set: newUser });
      continue;
    }

    if (oldUser.follows_viewer && !user.follows_viewer) {
      const newUser = { ...user, updated_at: now, unfollowed_me_at: now };
      report.new_unfollowers.push(newUser);
      if (oldUser.followed_by_viewer !== user.followed_by_viewer) {
        newUser.unfollowed_at = now;
        report.new_unfollowed.push(newUser);
      }
      await db
        .collection("followed")
        .updateOne({ id: user.id }, { $set: newUser });
    } else {
      const newUser = { ...user, updated_at: now, followed_me_at: now };
      report.new_followers.push(newUser);
      await db
        .collection("followed")
        .updateOne({ id: user.id }, { $set: newUser });
    }
  }

  // Update unfollowed users
  const userIds = users.map((user) => user.id);
  const unfollowed = await db
    .collection<User>("followed")
    .find({ id: { $nin: userIds }, unfollowed_at: { $exists: false } })
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

  return { users, report };
}
