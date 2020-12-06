const { zwift } = require('./config');

async function downloadActivity(page) {
    // open "activity settings" modal
    await page.click('.activity__summary__title .zwift__icon:nth-child(3)');

    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.click('#activityFitFile'),
    ]);

    const path = await download.saveAs('./latest.fit');
}

async function logIn(page) {
    await page.fill('#username', zwift.username);
    await page.fill('#password', zwift.password);
    await page.click('#submit-button')
}

async function navigateToLatestActivity(page) {
    await page.click('.activity__list li:first-child');
}

async function navigateToLogin(page) {
    await page.goto('https://zwift.com/eu');
    await page.click('#znv-header-login-button')
}

module.exports = {
    downloadActivity,
    logIn,
    navigateToLatestActivity,
    navigateToLogin,
};