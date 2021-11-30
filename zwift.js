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
	await page.fill('#email-input', zwift.username);
	await page.fill('#password-input', zwift.password);
	await page.click('button:near(.SignInForm-module__actions--eEQsl)', { timeout: 90000 });
}

async function navigateToLatestActivity(page) {
	await page.click('.activity__list li:first-child');
}

async function navigateToLogin(page) {
	await page.goto('https://www.zwift.com/sign-in?redirect_uri=https%3A%2F%2Fwww.zwift.com%2Ffeed%3Fauth_redirect%3Dtrue');
	await page.waitForTimeout(2500);
	await page.click('#truste-consent-button');
}

module.exports = {
	downloadActivity,
	logIn,
	navigateToLatestActivity,
	navigateToLogin,
};
