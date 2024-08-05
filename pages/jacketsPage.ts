import { Locator, Page, expect } from "@playwright/test";
import { Color, Size } from '../types';

export class JacketsPage {
  static url = "https://magento.softwaretestingboard.com/men/tops-men/jackets-men.html";

  jacketsPageHeadingLocator: Locator;
  sizeLocator: Locator;
  productItemLocator: Locator;
  colorLocator: Locator;
  cartLocator: Locator;

  constructor(private page: Page) {
    this.jacketsPageHeadingLocator = this.page.locator('h1').getByText('Jackets');
  }

  static async openViaUrl(page: Page): Promise<JacketsPage> {
    await page.goto(this.url);
    const jacketsPage = new JacketsPage(page);
    jacketsPage.verifyPageLoaded();
    return jacketsPage;
  }

  private getProductItemLocator(productTitle: string) {
    return this.page.locator('.product-item-info', { hasText: productTitle });
  }

  async verifyPageLoaded() {
    await expect(this.jacketsPageHeadingLocator).toBeVisible();
  }

  async selectSize(
    { productTitle, size }: { productTitle: string; size: Size }
  ) {
    this.sizeLocator =
      this.getProductItemLocator(productTitle).locator('.swatch-option.text', { hasText: size });

    await this.sizeLocator.click();
  }
  
  async selectColor(
    { productTitle, color }: { productTitle: string; color: Color }
  ) {
    this.colorLocator = this.getProductItemLocator(productTitle).getByLabel(color);

    await this.colorLocator.click();
  }

  async addToCart(
    { productTitle }: { productTitle: string }
  ) {
    this.productItemLocator = this.getProductItemLocator(productTitle)
    this.productItemLocator.hover();
    this.cartLocator = this.productItemLocator.locator('.action.tocart.primary');

    await this.cartLocator.click();
  }
}
