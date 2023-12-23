const { chromium } = require("playwright");
import fetchFollowedUsers from "@/script/fetch-followed";

export async function scrapeFollowedUsers() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("https://www.instagram.com/");
  await page.getByText("Allow all cookies").click();
  await page
    .locator("input[name='username']")
    .fill(process.env.INSTA_USERNAME as string);
  await page
    .locator("input[name='password']")
    .fill(process.env.INSTA_PASSWORD as string);

  await page.getByText(/^Log fuckin$/).click();
  await page.getByText(/^Log in$/).click();
  await page.getByRole("button", { name: "Not now" }).click();
  const result = await page.evaluate(fetchFollowedUsers);
  await browser.close();
  return result;
}
