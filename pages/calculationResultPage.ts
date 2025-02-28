import {expect, Locator, Page} from "@playwright/test";
import * as allure from "allure-js-commons";

export class CalculationResultPage {

    page: Page;
    material: Locator;
    tableType: Locator;
    option: Locator;
    price: Locator;

    constructor(page: Page) {
        this.page = page;
        this.material = page.locator('(//div[@data-testid="order-list"])[1]/ul[1]/li[2]');
        this.tableType = page.locator('(//div[@data-testid="order-list"])[1]/h4').first();
        this.option = page.locator('(//div[@data-testid="order-list"])[1]/ul[3]/li');
        this.price = page.getByTestId('price-button');
    }

    async calculationPageResultsCheck() {

        const materialName = await this.material.textContent();
        const tableType = await this.tableType.textContent();
        const option = await this.option.textContent();
        const price = await this.price.textContent();

        await allure.step("Проверка результатов расчета", async () => {
            expect(materialName, 'Материал совпадает с ожидаемым').toEqual('Материал: Акрил Neomarm N-103 Gray Onix');
            expect(tableType, 'Тип столешницы совпадает с ожидаемым').toEqual('П-образная столешница');
            expect(option, 'Выбранная опция совпадает с ожидаемой').toEqual('Проточки для стока воды');
            expect(price, 'Итоговая сумма совпадает с ожидаемой').toEqual('451 500 ₽');
        });
    }
}