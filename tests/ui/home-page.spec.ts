import { test, expect } from '@playwright/test';
import { AmazonHomePage } from './pages/amazon-home-page';
import { CommonFunctions } from './reusables/common-functions';
import { TestData } from './config/test-data';

test.describe('UI Automation - Amazon', () => {
  let homePage: AmazonHomePage;
  let commonFunctions: CommonFunctions;

  test.beforeEach(async ({ page }) => {
    homePage = new AmazonHomePage(page);
    commonFunctions = new CommonFunctions(page);
    await commonFunctions.createVerificationDirectory();
    await commonFunctions.createResultsDirectory();
  });

  test.afterEach(async ({ page }, testInfo) => {
    // Take desktop screenshot at the end of each test
    const testName = testInfo.title || 'unknown-test';
    const testNameSanitized = testName.replace(/[^a-zA-Z0-9]/g, '-');
    await commonFunctions.takeDesktopScreenshot(testNameSanitized);
    await commonFunctions.logMessage(`Desktop screenshot captured for test: ${testName}`);
  });

  test('Home Page Verification', async ({ page }) => {
    // Navigate to the home page
    await homePage.navigateToHomePage();
    await commonFunctions.logMessage('Navigated to Amazon home page');

    // Wait for page to load completely
    await commonFunctions.waitForPageLoad();

    // Verify key navigation elements are visible
    expect(await homePage.isLogoVisible()).toBeTruthy();
    expect(await homePage.isSearchBoxVisible()).toBeTruthy();
    expect(await homePage.isCartIconVisible()).toBeTruthy();
    expect(await homePage.isHamburgerMenuVisible()).toBeTruthy();

    await commonFunctions.logMessage('All key navigation elements are visible');

    // Verify URL contains 'amazon'
    expect(await homePage.getCurrentUrl()).toContain(TestData.verificationTexts.amazon);
    
    // Verify page title contains 'Amazon'
    expect(await homePage.getPageTitle()).toContain('Amazon');

    // Take a screenshot of the home page
    await homePage.takeScreenshot(TestData.screenshotNames.homePage, commonFunctions.verificationPath);

    await commonFunctions.logMessage('Home page verification completed successfully');
  });
});
