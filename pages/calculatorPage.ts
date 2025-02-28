import {expect, Locator, Page} from "@playwright/test";
import * as allure from "allure-js-commons";

export class CalculatorPage {

    page: Page;
    hideTableSwitch: Locator;
    table: Locator;
    tableBorder: Locator;
    tableQTypeSwitcher: Locator;
    tableLTypeSwitcher: Locator;
    tableUTypeSwitcher: Locator;

    constructor(page: Page) {
        this.page = page;
        this.hideTableSwitch = page.getByTestId('hide-countertop');
        this.table = page.getByTestId('style_layer__miJDc').nth(2);
        this.tableQTypeSwitcher = page.getByTestId('countertop-type-q');
        this.tableLTypeSwitcher = page.getByTestId('countertop-type-l');
        this.tableUTypeSwitcher = page.getByTestId('countertop-type-u');

        // локатор для элементов, обозначающих границы столешницы на картинке столешницы
        this.tableBorder = page.locator('div.line');
    }

    async clickHideTableSwitcher() {
        await allure.step("Переключение свитча 'Скрыть столешницу", async () => {
            await this.hideTableSwitch.click()
            await expect(this.table, 'Столешница отображается').not.toBeVisible();
        });
    }

    /**
     *
     * @param type Разрешенные типы: Q (прямая), L (г-образная) и U (п-образная)
     */
    async tableTypeChange(type: string) {
        switch (type) {
            case 'Q':
                await allure.step("Проверка отображения прямой столешницы", async () => {
                    await this.tableQTypeSwitcher.click();
                    await this.page.waitForLoadState('domcontentloaded');
                    await expect(this.tableBorder).toHaveCount(4);
                });
                break;
            case 'L':
                await allure.step("Проверка отображения Г-образной столешницы", async () => {
                    await this.tableLTypeSwitcher.click();
                    await this.page.waitForLoadState('domcontentloaded');
                    await expect(this.tableBorder).toHaveCount(6);
                });
                break;
            case 'U':
                await allure.step("Проверка отображения П-образной столешницы", async () => {
                    await this.tableUTypeSwitcher.click();
                    await this.page.waitForLoadState('domcontentloaded');
                    await expect(this.tableBorder).toHaveCount(8);
                });
                break;
            default:
                throw new Error(`Неправильный тип столешницы: ${type}. Разрешенные типы: 'Q (прямая)', 'L (г-образная)', и 'U (п-образная)'`);
        }
    }
}