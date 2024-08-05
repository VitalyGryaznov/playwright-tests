import { test } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { HeaderComponent } from "../components/headerComponent";
import { LoginPage } from "../pages/loginPage";
import { JacketsPage } from "../pages/jacketsPage";
import { Color, Size } from "../types";
import { CartMenuComponent } from "../components/cartMenuComponent";
import { CheckoutPage } from "../pages/ckeckoutPage";
import { ReviewAndPaymentsPage } from "../pages/reviewAndPaymentsPage";

const productTitle = 'Proteus Fitness Jackshirt';

// TODO: clean cart if it's not empty
test(
  "user is able to see right price in the cart after adding a shopping item",
  async ({ page }) => {
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

    const jacketsPage = await JacketsPage.openViaUrl(page);
    await jacketsPage.verifyPageLoaded();
    await jacketsPage.selectSize({ size: Size.M, productTitle });
    await jacketsPage.selectColor({ color: Color.Blue, productTitle });
    await jacketsPage.addToCart({ productTitle });
    await headerComponent.clickOnCart();

    const cartMenuComponent = new CartMenuComponent(page);
    await cartMenuComponent.verifyComponentLoaded();
    await cartMenuComponent.checkout();
    
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.verifyPageLoaded();
    await checkoutPage.clickToNextButton();

    const reviewAndPaymentsPage = new ReviewAndPaymentsPage(page); 
    await reviewAndPaymentsPage.verifyPageLoaded();
    await reviewAndPaymentsPage.checkSubtotalPriceEquals('$45.00');
});
