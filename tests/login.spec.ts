import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { HeaderComponent } from "../components/headerComponent";
import { LoginPage } from "../pages/loginPage";
import { get } from "http";

test("user is able to log in from the home page", async ({ page }) => {
  // TODO move data loading to a separate file
  const credentials = { email: "aqa@test.com", password: "Password13@" };
  const homePage = await HomePage.openViaUrl(page);
  const headerComponent = new HeaderComponent(page);
  await headerComponent.verifyComponentLoaded();
  await headerComponent.clickOnLoginLink();
  const loginPage = new LoginPage(page);
  await loginPage.verifyPageLoaded();
  await loginPage.enterCredentials(credentials);
  await loginPage.submitForm();
  await homePage.verifyPageLoaded();
  await headerComponent.verifyLoggedIn();
});
