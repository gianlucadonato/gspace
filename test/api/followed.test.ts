import { generateMock } from "@anatine/zod-mock";
import { formatISO, sub } from "date-fns";
import { Db, MongoClient } from "mongodb";
import {
  getFollowedUser,
  getFollowedUsers,
  saveFollowedUsers,
} from "@/app/actions";
import { getReports } from "@/app/api/reports/route";
import { UserSchema } from "@/lib/schemas";

describe("followed users", () => {
  let connection: MongoClient;
  let db: Db;
  const yesterday = formatISO(sub(new Date(), { days: 1 }));

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL as string);
    db = await connection.db();
  });

  beforeEach(async () => {
    await db.collection("followed").deleteMany({});
    await db.collection("reports").deleteMany({});
  });

  afterAll(async () => {
    await connection.close();
  });

  it("returns followed users", async () => {
    await db
      .collection("followed")
      .insertMany([generateMock(UserSchema), generateMock(UserSchema)]);
    const followedUsers = await getFollowedUsers(db);
    expect(followedUsers.length).toBe(2);
  });

  it("should insert new users", async () => {
    const users = [generateMock(UserSchema), generateMock(UserSchema)];
    await saveFollowedUsers(db, users);
    const followedUsers = await getFollowedUsers(db);
    expect(followedUsers.length).toBe(2);
    const reports = await getReports(db);
    expect(reports[0].new_followed.length).toBe(2);
  });

  it("should update unfollowed users", async () => {
    const users = [generateMock(UserSchema), generateMock(UserSchema)];
    await saveFollowedUsers(db, users);

    await saveFollowedUsers(db, []);
    const followedUsers = await getFollowedUsers(db);
    expect(followedUsers.length).toBe(2);
    expect(followedUsers[0].followed_by_viewer).toBe(false);
    expect(followedUsers[0].unfollowed_at).toBeTruthy();
    expect(followedUsers[1].followed_by_viewer).toBe(false);
    expect(followedUsers[1].unfollowed_at).toBeTruthy();

    const reports = await getReports(db);
    expect(reports[0].new_unfollowed.length).toBe(2);
  });

  it("should detect users that unfollowed you", async () => {
    const user = {
      ...generateMock(UserSchema),
      follows_viewer: true,
    };
    await saveFollowedUsers(db, [user]);
    user.follows_viewer = false;
    await saveFollowedUsers(db, [user]);
    const followedUser = await getFollowedUser(db, { id: user.id });
    expect(followedUser?.unfollowed_me_at).toBeTruthy();

    const reports = await getReports(db);
    expect(reports[0].new_unfollowers.length).toBe(1);
    expect(reports[0].new_unfollowers[0].username).toBe(user.username);
  });

  it("should detect users that have started following you", async () => {
    const user = {
      ...generateMock(UserSchema),
      follows_viewer: false,
    };
    await saveFollowedUsers(db, [user]);
    user.follows_viewer = true;
    await saveFollowedUsers(db, [user]);
    const followedUser = await getFollowedUser(db, { id: user.id });
    expect(followedUser?.followed_me_at).toBeTruthy();

    const reports = await getReports(db);
    expect(reports[0].new_followers.length).toBe(1);
    expect(reports[0].new_followers[0].username).toBe(user.username);
  });

  it("should update the user if nothing changes", async () => {
    const user = { ...generateMock(UserSchema), updated_at: yesterday };
    await saveFollowedUsers(db, [user]);
    await saveFollowedUsers(db, [user]);
    const savedUser = await getFollowedUser(db, { id: user.id });
    expect(savedUser?.updated_at).not.toEqual(user.updated_at);
  });
});
