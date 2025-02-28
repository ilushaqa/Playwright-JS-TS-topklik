import {expect, Locator, Page} from "@playwright/test";
import * as allure from "allure-js-commons";

export class MainPage {

    page: Page;
    loginField: Locator;
    passwordField: Locator;
    loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginField = page.getByPlaceholder('логин');
        this.passwordField = page.getByPlaceholder('пароль');
        this.loginButton = page.getByRole('button', {name: 'Войти'})
    }

    async standOpen() {
        await allure.step("Открытие сайта", async () => {
            await this.page.goto("https://dev.topklik.online/");
            await expect(this.page.getByText('Войдите в личный кабинет, чтобы начать расчет.')).toBeVisible();
        });
    }

    async userAuthorization(login: string, password: string) {
        await allure.step("Авторизация", async () => {
            await this.loginField.fill(login);
            await this.passwordField.fill(password);
            await this.loginButton.click();
            await expect(this.page.getByText('Калькулятор столешниц')).toBeVisible();
        });
    }
}