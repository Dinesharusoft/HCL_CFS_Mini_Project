import { test, expect } from '@playwright/test';
import { AmazonHomePage } from './pages/amazon-home-page';
import { AmazonSearchResultsPage } from './pages/amazon-search-results-page';
import { CommonFunctions } from './reusables/common-functions';
import { TestData } from './config/test-data';

test.describe('UI Automation - Amazon @search', () => {
  let homePage: AmazonHomePage;
  let searchResultsPage: AmazonSearchResultsPage;
  let commonFunctions: CommonFunctions;

  test.beforeEach(async ({ page }) => {
    homePage = new AmazonHomePage(page);
    searchResultsPage = new AmazonSearchResultsPage(page);
    commonFunctions = new CommonFunctions(page);
    await commonFunctions.createVerificationDirectory();
  });

  test('Search Functionality', async ({ page }) => {
    // Navigate to the home page
    await homePage.navigateToHomePage();
    await commonFunctions.logMessage('Navigated to Amazon home page');

    // Wait for page to load completely
    await commonFunctions.waitForPageLoad();

    // Verify search box is visible
    expect(await homePage.isSearchBoxVisible()).toBeTruthy();
    await commonFunctions.logMessage('Search box is visible');

    // Search for a product
    await homePage.searchProduct(TestData.searchTerms.laptop);
    await commonFunctions.logMessage(`Searched for: ${TestData.searchTerms.laptop}`);

    // Verify search results page loaded
    expect(await searchResultsPage.isSearchResultsVisible()).toBeTruthy();
    await commonFunctions.logMessage('Search results are visible');

    // Verify search term in results
    expect(await searchResultsPage.verifySearchTermInResults(TestData.searchTerms.laptop)).toBeTruthy();
    await commonFunctions.logMessage('Search term found in results');

    // Verify search term in URL
    expect(await searchResultsPage.getCurrentUrl()).toContain(TestData.searchTerms.laptop);
    await commonFunctions.logMessage('Search term found in URL');

    // Verify search term in page title
    expect(await searchResultsPage.getPageTitle()).toContain(TestData.searchTerms.laptop);
    await commonFunctions.logMessage('Search term found in page title');

    // Get search results count
    const resultsCount = await searchResultsPage.getSearchResultsCount();
    expect(resultsCount).toBeGreaterThan(0);
    await commonFunctions.logMessage(`Found ${resultsCount} search results`);

    // Verify filter section is visible
    expect(await searchResultsPage.isFilterSectionVisible()).toBeTruthy();
    await commonFunctions.logMessage('Filter section is visible');

    // Capture a screenshot of the search results page
    await searchResultsPage.takeScreenshot(TestData.screenshotNames.searchResults, commonFunctions.verificationPath);

    await commonFunctions.logMessage('Search functionality test completed successfully');
  });
});
