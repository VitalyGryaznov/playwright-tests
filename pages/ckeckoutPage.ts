import { Locator, Page, expect } from "@playwright/test";

export class CheckoutPage {
  nextButtonLocator: Locator;
  summaryBlockLocator: Locator;

  constructor(private page: Page) {
    this.nextButtonLocator = this.page.locator('.button.action.continue.primary');
    this.summaryBlockLocator = this.page.locator('.opc-block-summary');
  }

  async verifyPageLoaded() {
    await expect(this.summaryBlockLocator).toBeVisible();
  }

  async clickToNextButton() {
    await this.nextButtonLocator.click();
  }
}
