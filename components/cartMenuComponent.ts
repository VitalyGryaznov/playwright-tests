import { Locator, Page, expect } from "@playwright/test";

export class CartMenuComponent {
  page: Page;
  cartMenuBlockLocator: Locator;
  checkoutButtonLocator: Locator

  constructor(page) {
    this.page = page;
    this.cartMenuBlockLocator = this.page.locator(".block.block-minicart.ui-dialog-content.ui-widget-content");
    this.checkoutButtonLocator = this.page.locator('#top-cart-btn-checkout');
  }

  async verifyComponentLoaded() {
    await expect(this.cartMenuBlockLocator).toBeVisible();
  }

  async checkout() {
    await this.checkoutButtonLocator.click();
  }

}