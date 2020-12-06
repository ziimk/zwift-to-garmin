const { garmin } = require('./config');

async function logIn(page) {
    await page.fill('#username', garmin.username);
    await page.fill('#password', garmin.password);

    await page.click('#login-btn-signin')
}

async function importActivity(page) {
    await page.goto('https://connect.garmin.com/modern/import-data');

    page.on('filechooser', async fileChooser => {
        await fileChooser.setFiles('./latest.fit');
    });

    await page.click('#import-data');
    await page.click('#import-data-start');
    await page.waitForTimeout(5000)
}

async function navigateToLogin(page) {
    await page.goto('https://sso.garmin.com/sso/signin?service=https%3A%2F%2Fconnect.garmin.com%2Fmodern%2F&webhost=https%3A%2F%2Fconnect.garmin.com%2Fmodern%2F&source=https%3A%2F%2Fconnect.garmin.com%2Fsignin&redirectAfterAccountLoginUrl=https%3A%2F%2Fconnect.garmin.com%2Fmodern%2F&redirectAfterAccountCreationUrl=https%3A%2F%2Fconnect.garmin.com%2Fmodern%2F&gauthHost=https%3A%2F%2Fsso.garmin.com%2Fsso&locale=en_GB&id=gauth-widget&cssUrl=https%3A%2F%2Fconnect.garmin.com%2Fgauth-custom-v1.2-min.css&privacyStatementUrl=https%3A%2F%2Fwww.garmin.com%2Fen-GB%2Fprivacy%2Fconnect%2F&clientId=GarminConnect&rememberMeShown=true&rememberMeChecked=false&createAccountShown=true&openCreateAccount=false&displayNameShown=false&consumeServiceTicket=false&initialFocus=true&embedWidget=false&generateExtraServiceTicket=true&generateTwoExtraServiceTickets=false&generateNoServiceTicket=false&globalOptInShown=true&globalOptInChecked=false&mobile=false&connectLegalTerms=true&showTermsOfUse=false&showPrivacyPolicy=false&showConnectLegalAge=false&locationPromptShown=true&showPassword=true&useCustomHeader=false&mfaRequired=false&rememberMyDeviceShown=false&rememberMyDeviceChecked=false');
}

module.exports = {
    importActivity,
    logIn,
    navigateToLogin,
};