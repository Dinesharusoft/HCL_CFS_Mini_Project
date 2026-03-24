import { Page, Locator } from '@playwright/test';

export class AmazonElectronicsPage {
  readonly page: Page;
  readonly electronicsHeader: Locator;
  readonly mobilesComputersLink: Locator;
  readonly allMobilePhonesLink: Locator;
  readonly laptopsLink: Locator;
  readonly camerasLink: Locator;
  readonly audioLink: Locator;
  readonly tvLink: Locator;
  readonly gamingLink: Locator;
  readonly searchResults: Locator;
  readonly filterSection: Locator;
  readonly sortByDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.electronicsHeader = page.locator("//h2[text()[normalize-space()='Electronics']]");
    this.mobilesComputersLink = page.locator("//a[contains(text(), 'Mobiles, Computers')]");
    this.allMobilePhonesLink = page.locator("//a[contains(text(), 'All Mobile Phones')]");
    this.laptopsLink = page.locator("//a[contains(text(), 'Laptops')]");
    this.camerasLink = page.locator("//a[contains(text(), 'Cameras')]");
    this.audioLink = page.locator("//a[contains(text(), 'Audio')]");
    this.tvLink = page.locator("//a[contains(text(), 'TV')]");
    this.gamingLink = page.locator("//a[contains(text(), 'Gaming')]");
    this.searchResults = page.locator('[data-component-type="s-search-result"]');
    this.filterSection = page.locator('#s-refinements');
    this.sortByDropdown = page.locator('#s-result-sort-select');
  }

  async isElectronicsHeaderVisible(): Promise<boolean> {
    return await this.electronicsHeader.isVisible();
  }

  async navigateToMobilesComputers(): Promise<void> {
    await this.mobilesComputersLink.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
  }

  async navigateToAllMobilePhones(): Promise<void> {
    await this.allMobilePhonesLink.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
  }

  async navigateToLaptops(): Promise<void> {
    await this.laptopsLink.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
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

  async sortByOption(option: string): Promise<void> {
    await this.sortByDropdown.selectOption(option);
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
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
