import {expect, Locator, Page} from "@playwright/test";
import * as allure from "allure-js-commons";

enum TableType {
    Q = 'Q',
    L = 'L',
    U = 'U'
}

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
            await expect(this.table, 'Столешница не отображается').not.toBeVisible();
        });
    }

    /**
     *
     * @param type Разрешенные типы: Q (прямая), L (г-образная) и U (п-образная)
     */
    async tableTypeChange(type: TableType) {
        switch (type) {
            case 'Q':
                await allure.step("Изменение типа столешницы на прямую", async () => {
                    await this.tableQTypeSwitcher.click();
                    await this.page.waitForLoadState('domcontentloaded');
                    await expect(this.tableBorder).toHaveCount(4);
                });
                break;
            case 'L':
                await allure.step("Изменение типа столешницы на прямую Г-образную", async () => {
                    await this.tableLTypeSwitcher.click();
                    await this.page.waitForLoadState('domcontentloaded');
                    await expect(this.tableBorder).toHaveCount(6);
                });
                break;
            case 'U':
                await allure.step("Изменение типа столешницы на прямую П-образную", async () => {
                    await this.tableUTypeSwitcher.click();
                    await this.page.waitForLoadState('domcontentloaded');
                    await expect(this.tableBorder).toHaveCount(8);
                });
                break;
            default:
                throw new Error(`Неправильный тип столешницы: ${type}. Разрешенные типы: 'Q (прямая)', 'L (г-образная)', и 'U (п-образная)'`);
        }
    }

    async createOrder() {
        await this.thicknessSet(4);
        await this.baseboardClick();
        await this.additionalTableClick();
        await this.waterFlowClick();
        await this.colorSelect('N-103 Gray Onix');
        await this.calculationButtonClick();
    }

    async thicknessSet(x: number) {

        await allure.step("Выбор толщины столешницы", async () => {
            const currentThickness = await this.page.locator('div.inputDigital').first().textContent();

            if (parseInt(currentThickness.trim(), 10) !== x) {
                await this.page.locator('(//div[@data-testid="select-thickness"])[1]/button').click();
                await this.page.getByTestId('countertop').getByRole('button', { name: '4' }).click();
            }

            const currentThicknessAfterOperation = await this.page.locator('div.inputDigital').first().textContent();
            expect(parseInt(currentThicknessAfterOperation.trim(), 10)).toEqual(x);
        });
    }

    async baseboardClick() {
        await allure.step("Выбор опции 'Плинтус'", async () => {
            await this.page.locator('//button/div[text()="Плинтус"]').click();
        });
    }

    async additionalTableClick() {
        await allure.step("Выбор опции 'Остров'", async () => {
            await this.page.locator('//h4[text()=\'Остров\']').click();
        });
    }

    async waterFlowClick() {
        await allure.step("Выбор опции 'Проточки для стока воды'", async () => {
            await this.page.locator('//h4[text()=\'Проточки для стока воды\']').click();
        });
    }

    async colorSelect(colorName: string) {
        await allure.step("Выбор цвета", async () => {
            await this.page.locator(`//div[text()=\'${colorName}\']`).click();
        });
    }

    async calculationButtonClick() {
        await allure.step("Клик по кнопке 'Рассчитать'", async () => {
            await this.page.getByTestId('calc-button').click();
            await expect(this.page.getByText('Обработчики')).toBeVisible();
        });
    }
}

