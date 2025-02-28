import {test} from '@playwright/test';

import {MainPage} from "../pages/mainPage";

let mainPage: MainPage;

test.beforeEach(async ({page}) => {
    mainPage = new MainPage(page);
    await mainPage.standOpen();
});

test("Авторизация на сайте с правильными кредами", async () => {
    await mainPage.userAuthorization('tester@inzhenerka.tech', 'LetsTest!');
});
