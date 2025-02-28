import {test} from '@playwright/test';

import {MainPage} from "../pages/mainPage";
import {CalculatorPage} from "../pages/calculatorPage";

let mainPage: MainPage;
let calculatorPage: CalculatorPage;

test.beforeEach(async ({page}) => {
    mainPage = new MainPage(page);
    calculatorPage = new CalculatorPage(page);

    await mainPage.standOpen();
    await mainPage.userAuthorization('tester@inzhenerka.tech', 'LetsTest!');
});

test("Проверка переключателя 'Скрыть столешницу'", async () => {
    await calculatorPage.clickHideTableSwitcher();
});
