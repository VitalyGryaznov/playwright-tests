import { Locator, Page, expect } from "@playwright/test";

export class HeaderComponent {
  page: Page;
  headerLocator: Locator;
  loginLinkLocator: Locator;
  loggedInGreetingsLocator: Locator;
  cartLocator: Locator;

  constructor(page) {
    this.page = page;
    this.headerLocator = this.page.locator(".panel.header");
    this.loginLinkLocator = this.page.locator("header .authorization-link");
    this.loggedInGreetingsLocator = this.page.locator("header .logged-in");
    this.cartLocator = this.page.locator('.minicart-wrapper');
  }

  async verifyComponentLoaded() {
    await expect(this.headerLocator).toBeVisible();
  }

  async clickOnLoginLink() {
    await this.loginLinkLocator.click();
  }

  async clickOnCart() {
    await this.cartLocator.click();
  }

  async verifyLoggedIn() {
    await expect(this.loggedInGreetingsLocator).toBeVisible({
      timeout: 600000,
    });
  }
}