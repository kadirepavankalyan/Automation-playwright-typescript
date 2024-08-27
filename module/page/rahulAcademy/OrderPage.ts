import { Page, Locator, expect } from '@playwright/test';
import { Logger } from '../../utilities/Logger';

export class OrderPage {
    readonly page: Page;
    readonly addToCartButton: Locator;
    readonly checkoutButton: Locator;
    readonly itemInCart: Locator;
    readonly checkoutCTA: Locator;
    readonly countryInput: Locator;
    readonly dropdownSuggestion: Locator;
    readonly agreeTermsCheckbox: Locator;
    readonly purchaseButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.locator('div.card-footer button.btn-info');
        this.checkoutButton = page.locator('a.nav-link.btn.btn-primary');
        this.itemInCart = page.locator('h4.media-heading a');
        this.checkoutCTA = page.locator('button.btn.btn-success')
        this.countryInput = page.locator('#country');
        this.dropdownSuggestion = page.locator('(//div[@class="suggestions"]//a)[1]');
        this.agreeTermsCheckbox = page.locator('//label[@for="checkbox2"]');
        this.purchaseButton = page.locator('input[value="Purchase"]');
        this.successMessage = page.locator('div.alert.alert-success');
    }

    async addItemToCart() {
        try {
            await this.addToCartButton.first().click();
            Logger.info('Added item to cart.');
        } catch (error) {
            Logger.error('Failed to add item to cart.', error);
            throw error;
        }
    }

    async proceedToCheckout() {
        try {
            await this.checkoutButton.click();
            await this.page.waitForLoadState('networkidle');
            Logger.info('Proceeded to checkout.');
        } catch (error) {
            Logger.error('Failed to proceed to checkout.', error);
            throw error;
        }
    }

    async verifyItemInCart(expectedItemName: string) {
        try {
            const actualItemName = await this.itemInCart.textContent();
            expect(actualItemName?.trim()).toBe(expectedItemName);
            Logger.info(`Verified item in cart: ${actualItemName?.trim()}`);
        } catch (error) {
            Logger.error(`Item verification failed. Expected: ${expectedItemName}`, error);
            throw error;
        }
    }

    async clickOnCheckOut() {
         try {
            await this.checkoutCTA.click();
            await this.page.waitForLoadState('networkidle');
            Logger.info('Clicked on checkout.');
        } catch (error) {
            Logger.error('Failed to click to checkout.', error);
            throw error;
        }
    }

    async purchaseItem(country: string) {
        try {
            await this.countryInput.pressSequentially(country, { delay: 50 });
            // await this.dropdownSuggestion.waitFor({ state: 'visible' });
            // await this.dropdownSuggestion.click({ timeout: 3000 });
            // await this.agreeTermsCheckbox.check();
            await this.purchaseButton.click();
            Logger.info('Completed purchase process.');
        } catch (error) {
            Logger.error('Failed to complete purchase process.', error);
            throw error;
        }
    }

    async isSuccessMessageVisible() {
        try {
            await expect(this.successMessage).toBeVisible();
            const messageText = await this.successMessage.textContent();
            // Logger.info(`Purchase success message displayed: ${messageText?.trim()}`);
            return messageText?.trim();
        } catch (error) {
            Logger.error('Purchase success message not visible.', error);
            throw error;
        }
    }
}
