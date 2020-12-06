const { chromium } = require('playwright');

const garmin = require('./garmin');
const zwift = require('./zwift');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage({ acceptDownloads: true });

    try {
        await zwift.navigateToLogin(page);
        await zwift.logIn(page);
        await zwift.navigateToLatestActivity(page);
        await zwift.downloadActivity(page);

        await garmin.navigateToLogin(page);
        await garmin.logIn(page);
        await garmin.importActivity(page);

        await page.screenshot({ path: 'result.png' });
    } catch (error) {
        console.log(error);
    } finally {
        await browser.close();
    } 
})();