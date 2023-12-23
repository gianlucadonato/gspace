import { test, expect } from "@playwright/test";
import fetchFollowedUsers from "../script/fetch-followed";

test("instagram login", async ({ page }) => {
  test.setTimeout(5 * (60 * 1000));
  await page.goto("https://www.instagram.com/");
  await page.getByText("Allow all cookies").click();
  await page
    .locator("input[name='username']")
    .fill(process.env.INSTA_USERNAME as string);
  await page
    .locator("input[name='password']")
    .fill(process.env.INSTA_PASSWORD as string);

  await page.getByText(/^Log in$/).click();
  await page.getByRole("button", { name: "Not now" }).click();
  await expect(
    page.getByAltText("gianlucadonato's profile picture")
  ).toBeVisible();
  const result = await page.evaluate(fetchFollowedUsers);
});
