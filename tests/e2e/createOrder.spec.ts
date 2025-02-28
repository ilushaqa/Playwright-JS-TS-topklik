import {test} from '@playwright/test';

import {MainPage} from "../../pages/mainPage";
import {CalculatorPage} from "../../pages/calculatorPage";
import {CalculationResultPage} from "../../pages/calculationResultPage";
import * as allure from "allure-js-commons";

let mainPage: MainPage;
let calculatorPage: CalculatorPage;
let calculationResultPage: CalculationResultPage;

test.beforeEach(async ({page}) => {
    mainPage = new MainPage(page);
    calculatorPage = new CalculatorPage(page);
    calculationResultPage = new CalculationResultPage(page);

    await mainPage.standOpen();
    await mainPage.userAuthorization('tester@inzhenerka.tech', 'LetsTest!');
});

test("Создание заказа", async () => {

    await allure.epic('E2E');
    await allure.suite('Создание заказа');
    await allure.severity('critical');
    await allure.description('Создание заказа П-образной столешницы');

    await calculatorPage.tableTypeChange('U');
    await calculatorPage.createOrder();
    await calculationResultPage.calculationPageResultsCheck();
});
