const { test, chromium } = require('@playwright/test');
let counter = 0, playBtn, video1, video1CountBefore, video1CountAfter, replayBtn;
const launchOptions = {
    proxy: {
        server: '83.229.72.174:80'
    }
};
test.describe.configure({ mode: 'serial' });
test(`Check initial run ${counter++}`, async ({ page }) => {
    const browser = await chromium.launch();
    await page.goto('https://www.youtube.com/@prostopro1/videos');
    video1 = await page.locator('xpath = (//span[contains(@class,"inline-metadata-item style-scope")])[1]').textContent();
    video1CountBefore = Number(video1.slice(0, video1.indexOf(' ')));
    console.log(video1CountBefore);
    await browser.close();
})
for (let i = 0; i < 20; i++) {
    test(`Ukraine's flag ${counter++}`, async ({ page }) => {
        const browser = await chromium.launch({launchOptions});
        await page.goto('https://www.youtube.com/watch?v=RHKYTPT_WII');
        playBtn = await page.locator('xpath = //button[@title="Play (k)"]');
        if (await playBtn.isVisible()) {
            await playBtn.click();
        }
        // replayBtn = await page.locator('xpath = //button[@data-title-no-tooltip="Replay"]').waitFor({ timeout: 500000 })
        await page.waitForTimeout(90000);
        await browser.close();
    });
}
test(`Check run result ${counter++}`, async ({ page, browser }) => {
    browser = await chromium.launch();
    await page.goto('https://www.youtube.com/@prostopro1/videos');
    await page.waitForTimeout(3000);
    video1 = await page.locator('xpath = (//span[contains(@class,"inline-metadata-item style-scope")])[1]').textContent();
    video1CountAfter = Number(video1.slice(0, video1.indexOf(' ')));
    let res1 = video1CountAfter - video1CountBefore;
    console.log("Before run: " + video1CountBefore + " reviews. After run: " + video1CountAfter + " reviews. Added: " + res1 + " new reviews");
    await browser.close();
});