import {test} from '@playwright/test';

import {MainPage} from "../pages/mainPage";
import {CalculatorPage} from "../pages/calculatorPage";
import * as allure from "allure-js-commons";

let mainPage: MainPage;
let calculatorPage: CalculatorPage;

test.beforeEach(async ({page}) => {
    mainPage = new MainPage(page);
    calculatorPage = new CalculatorPage(page);

    await mainPage.standOpen();
    await mainPage.userAuthorization('tester@inzhenerka.tech', 'LetsTest!');
});

test("Проверка переключателя 'Скрыть столешницу'", async () => {

    await allure.epic('Калькулятор столешниц');
    await allure.suite('Переключатели');
    await allure.severity('minor');
    await allure.description('Проверка переключателя "Скрыть столешницу"');

    await calculatorPage.clickHideTableSwitcher();
});
