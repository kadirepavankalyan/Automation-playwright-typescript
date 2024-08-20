import { Page } from "@playwright/test";
export default class RegisterPage {


    constructor(public page: Page) { }
    

    async enterFirstName(firstname: string) {
        await this.page.locator("#input-firstname")
            .fill(firstname);
    }
    async enterLastName(lastname: string) {
        await this.page.locator("input[name='lastname']")
            .fill(lastname);
    }
    async enterEmail(email: string) {
        await this.page.locator("input[name='email']")
            .fill(email);
    }

    async enterTelephone(phone: string) {
        await this.page.locator("input[name='telephone']")
            .fill(phone);
    }

    async enterPassword(password: string) {
        await this.page.locator("input[name='password']")
            .fill(password);
    }

    async enterConfirmPassword(password: string) {
        await this.page.locator("input[name='confirm']")
            .fill(password);
    }


    isSubscribeChecked() {
        return this.page.locator("#input-newsletter-no");
    }

    async clickTermandConditon() { 
        await this.page.click("//label[@for='input-agree']")
    }

    async clickContinueToRegister() { 
        await Promise.all([
            this.page.click("input[value='Continue']")
        ])
    }

}