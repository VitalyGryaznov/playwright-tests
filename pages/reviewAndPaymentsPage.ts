import { Locator, Page, expect } from "@playwright/test";

export class ReviewAndPaymentsPage {
  summaryBlockLocator: Locator;
  subtotalPriceLocator: Locator;

  constructor(private page: Page) {
    this.subtotalPriceLocator = this.page.locator('[data-th="Cart Subtotal"]');
    this.summaryBlockLocator = this.page.locator('.opc-block-summary')
  }

  async verifyPageLoaded() {
    await expect(this.summaryBlockLocator).toBeVisible();
  }

  async checkSubtotalPriceEquals(price: string) {
    await expect(this.subtotalPriceLocator).toContainText(price);
  }
}
