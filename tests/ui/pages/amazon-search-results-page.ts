import { Page, Locator } from '@playwright/test';

export class AmazonSearchResultsPage {
  readonly page: Page;
  readonly searchResults: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly filterSection: Locator;
  readonly productTitles: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchResults = page.locator('[data-component-type="s-search-result"]');
    this.searchInput = page.locator('#twotabsearchtextbox');
    this.searchButton = page.locator('#nav-search-submit-button');
    this.filterSection = page.locator('#s-refinements');
    this.productTitles = page.locator('[data-component-type="s-search-result"] h2 span');
 }

  async isSearchResultsVisible(): Promise<boolean> {
    return await this.searchResults.first().isVisible();
  }

  async getSearchResultsCount(): Promise<number> {
    return await this.searchResults.count();
  }

  async verifySearchTermInResults(searchTerm: string): Promise<boolean> {
    const firstResult = await this.productTitles.first().textContent();
    return firstResult?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
  }

  async isFilterSectionVisible(): Promise<boolean> {
    return await this.filterSection.isVisible();
  }


  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async takeScreenshot(fileName: string, fullPath: string): Promise<void> {
    await this.page.screenshot({ 
      path: `${fullPath}/${fileName}.png`,
      fullPage: true 
    });
  }

  async verifyPageContainsText(text: string): Promise<boolean> {
    const content = await this.page.content();
    return content.toLowerCase().includes(text.toLowerCase());
  }

  async waitForElementToBeVisible(locator: Locator, timeout: number = 5000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }
}
