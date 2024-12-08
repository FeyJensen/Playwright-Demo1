// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");

async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");

  //create an array to hold articles
  const articleList = [];
  let currentArticle = 0;
  //Each page only holds 30 articles before you have to click "more"
  while (articleList.length < 100) {
    for (let i = 0; i < 30; i++) {
      let timestamp = await page.locator('span.age').nth(i).getAttribute('title');
      timestamp = timestamp.split(" ");
      timestamp = timestamp[0];
      timestamp = Date.parse(timestamp);

      articleList[currentArticle] = timestamp;

      currentArticle++;
    }
    await page.locator('.morelink').click();
  }

  // for (let i = 0; i < 100; i++){
  //   console.log(articleList[i]);
  // }

  for (let i = 0; i < 99; i++) {
    if (articleList[i + 1] > articleList[i]) {
      console.log("Fail. Articles are not sorted newest to oldest");
      await browser.close();
      return;
    }
  }

  console.log("Pass! All Articles are sorted from newest to oldest");
  await browser.close();
  return;
}


(async () => {
  await sortHackerNewsArticles();
})();
