import {expect, Locator, Page} from "@playwright/test";
import * as allure from "allure-js-commons";

export class CalculatorPage {

    page: Page;
    hideTableSwitch: Locator;
    table: Locator;

    constructor(page: Page) {
        this.page = page;
        this.hideTableSwitch = page.getByTestId('hide-countertop');
        this.table = page.getByTestId('style_layer__miJDc').nth(2);
    }

    async clickHideTableSwitcher() {
        await allure.step("Переключение свитча 'Скрыть столешницу", async () => {
            await this.hideTableSwitch.click()
            await expect(this.table, 'Столешница отображается').not.toBeVisible();
        });
    }
}