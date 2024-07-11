import { Locator, Page, expect } from "@playwright/test";

export class LoginPage {
  homePagePromoLocator: Locator;
  emailInput: Locator;
  passwordInput: Locator;
  submitButton: Locator;

  constructor(private page: Page) {
    this.emailInput = this.page.locator("#email");
    this.passwordInput = this.page.locator("#pass");
    this.submitButton = this.page.locator(".action.login.primary");
  }

  async verifyPageLoaded() {
    await expect(this.passwordInput).toBeVisible();
  }

  async enterCredentials(credentials: { email: string; password: string }) {
    await this.emailInput.fill(credentials.email);
    await this.passwordInput.fill(credentials.password);
  }

  async submitForm() {
    await this.submitButton.click();
  }
}
