import { Page, Locator, expect } from '@playwright/test';
import { Logger } from '../../utilities/Logger';

export class CategoryFormPage {
    readonly page: Page;
    readonly categoryLink: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly exampleCheckbox: Locator;
    readonly genderDropdown: Locator;
    readonly employedRadioButton: Locator;
    readonly birthdateInput: Locator;
    readonly submitButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.categoryLink = page.locator('(//a[@class="list-group-item"])[1]');
        this.nameInput = page.locator('(//div[@class="form-group"]//input)[1]');
        this.emailInput = page.locator('(//div[@class="form-group"]//input)[2]');
        this.passwordInput = page.locator('#exampleInputPassword1');
        this.exampleCheckbox = page.locator('#exampleCheck1');
        this.genderDropdown = page.locator('#exampleFormControlSelect1');
        this.employedRadioButton = page.locator('#inlineRadio2');
        this.birthdateInput = page.locator('//input[@type="date"]');
        this.submitButton = page.locator('input[type="submit"]');
        this.successMessage = page.locator('.alert-success');
    }

    async selectCategory() {
        try {
            await this.categoryLink.click();
            Logger.info('Selected category.');
        } catch (error) {
            Logger.error('Failed to select category.', error);
            throw error;
        }
    }

    async fillForm(details: { name: string; email: string; password: string; gender: string; birthdate: string }) {
        try {
            const { name, email, password, gender, birthdate } = details;
            await this.nameInput.fill(name);
            await this.emailInput.fill(email);
            await this.passwordInput.fill(password);
            await this.exampleCheckbox.check();
            await this.genderDropdown.selectOption(gender);
            await this.employedRadioButton.check();
            await this.birthdateInput.fill(birthdate);
            Logger.info('Filled form with provided details.');
        } catch (error) {
            Logger.error('Failed to fill form.', error);
            throw error;
        }
    }

    async submitForm() {
        try {
            await this.submitButton.click();
            Logger.info('Submitted the form.');
        } catch (error) {
            Logger.error('Failed to submit the form.', error);
            throw error;
        }
    }

    async isSuccessMessageVisible() {
        try {
            await expect(this.successMessage).toBeVisible();
            const messageText = await this.successMessage.textContent();
            Logger.info(`Success message displayed: ${messageText?.trim()}`);
            return messageText?.trim();
        } catch (error) {
            Logger.error('Success message not visible.', error);
            throw error;
        }
    }
}
