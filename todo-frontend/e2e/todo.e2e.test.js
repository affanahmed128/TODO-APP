const { after, test } = require("node:test");
const assert = require("node:assert/strict");
const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
const backendUrl = process.env.BACKEND_URL || "http://localhost:3002/api";
let driver;

after(async () => {
  if (driver) {
    await driver.quit();
  }
});

test("adds and deletes a todo through the browser", async () => {
  const healthResponse = await fetch(`${backendUrl}/health`, {
    signal: AbortSignal.timeout(5000),
  });
  assert.equal(
    healthResponse.ok,
    true,
    `Backend health check failed at ${backendUrl}/health`
  );

  const options = new chrome.Options().addArguments(
    "--headless=new",
    "--disable-gpu",
    "--window-size=1280,800"
  );
  driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  await driver.get(frontendUrl);
  await driver.wait(until.elementLocated(By.css("h1")), 10000);
  assert.equal(await driver.findElement(By.css("h1")).getText(), "Todo List");

  const title = `Selenium todo ${Date.now()}`;
  let created = false;

  try {
    const input = await driver.findElement(
      By.css("input[placeholder='Add a new Todo']")
    );
    await input.sendKeys(title);
    created = true;
    await driver.findElement(By.css("button[type='submit']")).click();

    const todoRow = By.xpath(`//li[contains(., "${title}")]`);
    await driver.wait(until.elementLocated(todoRow), 10000);

    const row = await driver.findElement(todoRow);
    await row.findElement(By.xpath(".//button[normalize-space()='Delete']")).click();
    await driver.wait(async () => {
      const remainingRows = await driver.findElements(todoRow);
      return remainingRows.length === 0;
    }, 10000);
  } finally {
    if (created) {
      const remainingRows = await driver.findElements(
        By.xpath(`//li[contains(., "${title}")]`)
      );
      if (remainingRows.length > 0) {
        await remainingRows[0]
          .findElement(By.xpath(".//button[normalize-space()='Delete']"))
          .click();
        await driver.wait(async () => {
          const rows = await driver.findElements(
            By.xpath(`//li[contains(., "${title}")]`)
          );
          return rows.length === 0;
        }, 10000);
      }
    }
  }
});
