import { Page, Locator } from '@playwright/test';
import * as locators from '../locators/locators.json'; // Import the JSON file

export class ToolQAPage {
  // Make properties public
  public textBoxHeading: Locator;
  public userNameInput: Locator;
  public userEmailInput: Locator;
  public currentAddressInput: Locator;
  public permanentAddressInput: Locator;
  public submitButton: Locator;
  public output: Locator;

  constructor(public page: Page) {
    this.textBoxHeading = page.locator(locators.textBoxHeading);
    this.userNameInput = page.locator(locators.userNameInput);
    this.userEmailInput = page.locator(locators.userEmailInput);
    this.currentAddressInput = page.locator(locators.currentAddressInput);
    this.permanentAddressInput = page.locator(locators.permanentAddressInput);
    this.submitButton = page.locator(locators.submitButton);
    this.output = page.locator(locators.output);
  }

  async fillTextBoxForm(username: string, email: string, currentAddress: string, permanentAddress: string) {
    await this.userNameInput.fill(username);
    await this.userEmailInput.fill(email);
    await this.currentAddressInput.fill(currentAddress);
    await this.permanentAddressInput.scrollIntoViewIfNeeded();
    await this.permanentAddressInput.fill(permanentAddress);
  }

  async submitForm() {
    await this.submitButton.scrollIntoViewIfNeeded();
    await this.submitButton.click();
  }

  async getOutputText() {
    return await this.output.textContent();
  }
}