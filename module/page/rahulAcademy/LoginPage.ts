import { Page, Locator, expect } from '@playwright/test';
import { Logger } from '../../utilities/Logger'

export class LoginPage {
    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly userRoleDropdown: Locator;
    readonly termsCheckbox: Locator;
    readonly signInButton: Locator;
    readonly header: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.locator('#username');
        this.passwordField = page.locator('#password');
        this.userRoleDropdown = page.locator('select.form-control');
        this.termsCheckbox = page.locator('#terms');
        this.signInButton = page.locator('#signInBtn');
        this.header = page.locator('(//a[@class="navbar-brand"])[2]');
    }

    async navigateToLogin() {
        try {
            await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
            Logger.info('Navigated to login page.');
        } catch (error) {
            Logger.error('Failed to navigate to login page.', error);
            throw error;
        }
    }

    async fillUsername(username: string) {
        try {
            await this.usernameField.fill(username);
            Logger.info(`Filled username: ${username}`);
        } catch (error) {
            Logger.error('Failed to fill username.', error);
            throw error;
        }
    }

    async fillPassword(password: string) {
        try {
            await this.passwordField.fill(password);
            Logger.info(`Filled password.`);
        } catch (error) {
            Logger.error('Failed to fill password.', error);
            throw error;
        }
    }

    async selectUserRole(role: string) {
        try {
            await this.userRoleDropdown.selectOption(role);
            Logger.info(`Selected user role: ${role}`);
        } catch (error) {
            Logger.error(`Failed to select user role: ${role}`, error);
            throw error;
        }
    }

    async agreeToTerms() {
        try {
            await this.termsCheckbox.check();
            await expect(this.termsCheckbox).toBeChecked();
            Logger.info('Agreed to terms and conditions.');
        } catch (error) {
            Logger.error('Failed to agree to terms and conditions.', error);
            throw error;
        }
    }

    async signIn() {
        try {
            await this.signInButton.click();
            await this.page.waitForLoadState('networkidle');
            Logger.info('Clicked sign-in button.');
        } catch (error) {
            Logger.error('Failed to click sign-in button.', error);
            throw error;
        }
    }

    async isHeaderVisible() {
        try {
            await expect(this.header).toBeVisible();
            const headerText = await this.header.textContent();
            // Logger.info(`Header is visible with text: ${headerText?.trim()}`);
            return headerText?.trim();
        } catch (error) {
            Logger.error('Header is not visible after sign-in.', error);
            throw error;
        }
    }
}
