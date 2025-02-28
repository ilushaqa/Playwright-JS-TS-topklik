import {test} from '@playwright/test';
import * as allure from "allure-js-commons";

import {MainPage} from "../pages/mainPage";

let mainPage: MainPage;

test.beforeEach(async ({page}) => {
    mainPage = new MainPage(page);
    await mainPage.standOpen();
});

test("Авторизация на сайте с правильными кредами", async () => {

    await allure.epic('Авторизация');
    await allure.suite('Авторизация через e-mail');
    await allure.severity('blocker');
    await allure.description('Авторизация через e-mail');

    await mainPage.userAuthorization('tester@inzhenerka.tech', 'LetsTest!');
});
