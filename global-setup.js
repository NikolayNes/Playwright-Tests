const { request } = require('@playwright/test');

module.exports = async () => {
    const requestContext = await request.newContext();
    await requestContext.post("https://test-ledgerset.eastus.cloudapp.azure.com/login", {
        data: {
            username: "ludmila.nesvitiy@test6.com",
            password: "Qwerty123!"
        }
    })
    await requestContext.storageState({ path: 'storageState.json' });
    await requestContext.dispose();
};