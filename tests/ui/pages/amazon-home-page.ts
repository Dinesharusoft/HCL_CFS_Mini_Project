import { Page, Locator } from '@playwright/test';

export class AmazonHomePage {
  readonly page: Page;
  readonly logo: Locator;
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly cartIcon: Locator;
  readonly hamburgerMenu: Locator;
  readonly electronicsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('#nav-logo');
    this.searchBox = page.locator('#twotabsearchtextbox');
    this.searchButton = page.locator('#nav-search-submit-button');
    this.cartIcon = page.locator('#nav-cart');
    this.hamburgerMenu = page.locator('#nav-hamburger-menu');
    this.electronicsLink = page.locator("//a[text()[normalize-space()='Electronics']]").first();
  }

  async navigateToHomePage(): Promise<void> {
    await this.page.goto('https://www.amazon.in');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
  }

  async isLogoVisible(): Promise<boolean> {
    return await this.logo.isVisible();
  }

  async isSearchBoxVisible(): Promise<boolean> {
    return await this.searchBox.isVisible();
  }

  async isCartIconVisible(): Promise<boolean> {
    return await this.cartIcon.isVisible();
  }

  async isHamburgerMenuVisible(): Promise<boolean> {
    return await this.hamburgerMenu.isVisible();
  }

  async searchProduct(productName: string): Promise<void> {
    await this.searchBox.fill(productName);
    await this.searchButton.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
  }

  async navigateToElectronics(): Promise<void> {
    await this.electronicsLink.dispatchEvent('click');
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

  async waitForElementToBeHidden(locator: Locator, timeout: number = 5000): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout });
  }
}
