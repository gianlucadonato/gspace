import { getDateDifference } from "@/lib/utils";

describe("getDateDifference", () => {
  it("minutes", async () => {
    const now = "2023-12-23T23:14:26.775Z";
    const date = "2023-12-23T22:15:26.775Z";
    const result = getDateDifference(now, date);
    expect(result).toBe("59 min ago");
  });

  it("1 hour", async () => {
    const now = "2023-12-23T23:14:26.775Z";
    const date = "2023-12-23T22:14:26.775Z";
    const result = getDateDifference(now, date);
    expect(result).toBe("1 hours ago");
  });

  it("hours", async () => {
    const now = "2023-12-23T23:14:26.775Z";
    const date = "2023-12-23T20:14:26.775Z";
    const result = getDateDifference(now, date);
    expect(result).toBe("3 hours ago");
  });

  it("yesterday", async () => {
    const now = "2023-12-23T23:14:26.775Z";
    const date = "2023-12-22T22:14:26.775Z";
    const result = getDateDifference(now, date);
    expect(result).toBe("yesterday");
  });

  it("days", async () => {
    const now = "2023-12-23T23:14:26.775Z";
    const date = "2023-12-21T20:14:26.775Z";
    const result = getDateDifference(now, date);
    expect(result).toBe("2 days ago");
  });

  it("weeks", async () => {
    const now = "2023-12-23T21:34:58.190Z";
    const date = "2023-11-24T16:34:39.040Z";
    const result = getDateDifference(now, date);
    expect(result).toBe("4 weeks ago");
  });

  it("last month", async () => {
    const now = "2023-12-23T23:14:26.775Z";
    const date = "2023-11-23T20:14:26.775Z";
    const result = getDateDifference(now, date);
    expect(result).toBe("last month");
  });

  it("months", async () => {
    const now = "2023-12-23T23:14:26.775Z";
    const date = "2023-09-22T20:14:26.775Z";
    const result = getDateDifference(now, date);
    expect(result).toBe("3 months ago");
  });
});
