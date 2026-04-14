import { test, expect } from '@playwright/test';
import { AmazonHomePage } from './pages/amazon-home-page';
import { AmazonElectronicsPage } from './pages/amazon-electronics-page';
import { CommonFunctions } from './reusables/common-functions';
import { TestData } from './config/test-data';

test.describe('UI Automation - Amazon', () => {
  let homePage: AmazonHomePage;
  let electronicsPage: AmazonElectronicsPage;
  let commonFunctions: CommonFunctions;

  test.beforeEach(async ({ page }) => {
    homePage = new AmazonHomePage(page);
    electronicsPage = new AmazonElectronicsPage(page);
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

  test('Category Navigation @cat', async ({ page }) => {
    // Navigate to the home page
    await homePage.navigateToHomePage();
    await commonFunctions.logMessage('Navigated to Amazon home page');

    // Wait for page to load completely
    await commonFunctions.waitForPageLoad();

    // Look for Electronics category
    expect(await homePage.electronicsLink.isVisible()).toBeTruthy();
    await commonFunctions.logMessage('Electronics link is visible');

    // Click on Electronics category
    await homePage.navigateToElectronics();
    await commonFunctions.logMessage('Navigated to Electronics category');

    // Assert the destination page loaded correctly
    expect(await electronicsPage.isElectronicsHeaderVisible()).toBeTruthy();
    await commonFunctions.logMessage('Electronics header is visible');

    // Verify we're on the Electronics department page
    expect(await electronicsPage.getCurrentUrl()).toContain(TestData.verificationTexts.electronics);
    await commonFunctions.logMessage('Verified Electronics page URL');

    // Verify page contains Electronics content
    expect(await electronicsPage.verifyPageContainsText(TestData.categories.electronics)).toBeTruthy();
    await commonFunctions.logMessage('Verified Electronics page content');

    // Capture a screenshot of the category page
    await electronicsPage.takeScreenshot(TestData.screenshotNames.categoryNavigation, commonFunctions.verificationPath);

    await commonFunctions.logMessage('Category navigation completed successfully');
  });
});
