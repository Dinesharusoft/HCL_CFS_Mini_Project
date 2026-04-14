import { Page, Locator } from '@playwright/test';

export class AmazonElectronicsPage {
  readonly page: Page;
  readonly electronicsHeader: Locator;
  readonly searchResults: Locator;
  readonly filterSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.electronicsHeader = page.locator("//h2[text()[normalize-space()='Electronics']]");
    this.searchResults = page.locator('[data-component-type="s-search-result"]');
    this.filterSection = page.locator('#s-refinements');
  }

  async isElectronicsHeaderVisible(): Promise<boolean> {
    return await this.electronicsHeader.isVisible();
  }

  async isSearchResultsVisible(): Promise<boolean> {
    return await this.searchResults.first().isVisible();
  }

  async getSearchResultsCount(): Promise<number> {
    return await this.searchResults.count();
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

  async waitForElementToBeVisible(locator: Locator, timeout: number = 5000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async verifyPageContainsText(text: string): Promise<boolean> {
    const content = await this.page.content();
    return content.toLowerCase().includes(text.toLowerCase());
  }
} 

// Testing