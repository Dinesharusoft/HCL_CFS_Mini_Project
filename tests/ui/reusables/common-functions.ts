import { Page, Locator, expect } from '@playwright/test';
import { join } from 'path';

export class CommonFunctions {
  readonly page: Page;
  readonly verificationPath: string;

  constructor(page: Page) {
    this.page = page;
    this.verificationPath = join(__dirname, '../verification');
  }

  async waitForPageLoad(timeout: number = 30000): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded', { timeout });
    await this.page.waitForTimeout(2000); // Additional wait for dynamic content
  }

  async waitForElementToBeVisible(locator: Locator, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async waitForElementToBeHidden(locator: Locator, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  async waitForElementToBeEnabled(locator: Locator, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'attached', timeout });
    await expect(locator).toBeEnabled();
  }

  async clickElement(locator: Locator, options?: { force?: boolean; timeout?: number }): Promise<void> {
    const clickOptions = { timeout: 10000, ...options };
    await locator.waitFor({ state: 'visible', timeout: clickOptions.timeout });
    await locator.click(clickOptions);
  }

  async clickElementWithJS(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.dispatchEvent('click');
  }

  async fillInput(locator: Locator, value: string, clearFirst: boolean = true): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    if (clearFirst) {
      await locator.clear();
    }
    await locator.fill(value);
  }

  async selectDropdownOption(locator: Locator, option: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.selectOption(option);
  }

  async getElementText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible' });
    return await locator.textContent() || '';
  }

  async getElementAttribute(locator: Locator, attribute: string): Promise<string> {
    await locator.waitFor({ state: 'visible' });
    return await locator.getAttribute(attribute) || '';
  }

  async isElementVisible(locator: Locator, timeout: number = 5000): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      return await locator.isVisible();
    } catch {
      return false;
    }
  }

  async isElementEnabled(locator: Locator, timeout: number = 5000): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      return await locator.isEnabled();
    } catch {
      return false;
    }
  }

  async takeScreenshot(fileName: string, fullPage: boolean = true): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotName = `${fileName}-${timestamp}.png`;
    await this.page.screenshot({ 
      path: `${this.verificationPath}/${screenshotName}`,
      fullPage 
    });
  }

  async takeScreenshotWithCustomPath(fileName: string, customPath: string, fullPage: boolean = true): Promise<void> {
    await this.page.screenshot({ 
      path: `${customPath}/${fileName}`,
      fullPage 
    });
  }

  async scrollToElement(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.scrollIntoViewIfNeeded();
  }

  async hoverOverElement(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.hover();
  }

  async verifyUrlContains(expectedText: string): Promise<boolean> {
    const currentUrl = this.page.url();
    return currentUrl.toLowerCase().includes(expectedText.toLowerCase());
  }

  async verifyUrlEquals(expectedUrl: string): Promise<boolean> {
    const currentUrl = this.page.url();
    return currentUrl === expectedUrl;
  }

  async verifyPageTitleContains(expectedText: string): Promise<boolean> {
    const title = await this.page.title();
    return title.toLowerCase().includes(expectedText.toLowerCase());
  }

  async verifyPageTitleEquals(expectedTitle: string): Promise<boolean> {
    const title = await this.page.title();
    return title === expectedTitle;
  }

  async verifyPageContainsText(text: string): Promise<boolean> {
    const content = await this.page.content();
    return content.toLowerCase().includes(text.toLowerCase());
  }

  async verifyElementContainsText(locator: Locator, expectedText: string): Promise<boolean> {
    const text = await this.getElementText(locator);
    return text.toLowerCase().includes(expectedText.toLowerCase());
  }

  async verifyElementEqualsText(locator: Locator, expectedText: string): Promise<boolean> {
    const text = await this.getElementText(locator);
    return text === expectedText;
  }

  async waitForNetworkIdle(timeout: number = 10000): Promise<void> {
    try {
      await this.page.waitForLoadState('networkidle', { timeout });
    } catch {
      // Fallback to domcontentloaded if networkidle times out
      await this.page.waitForLoadState('domcontentloaded');
    }
  }

  async createVerificationDirectory(): Promise<void> {
    const fs = require('fs');
    if (!fs.existsSync(this.verificationPath)) {
      fs.mkdirSync(this.verificationPath, { recursive: true });
    }
  }

  async logMessage(message: string): Promise<void> {
    console.log(`[${new Date().toISOString()}] ${message}`);
  }

  async logError(error: Error): Promise<void> {
    console.error(`[${new Date().toISOString()}] ERROR: ${error.message}`);
    console.error(error.stack);
  }

  async generateRandomString(length: number = 10): Promise<string> {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  async generateRandomNumber(min: number = 1, max: number = 1000): Promise<number> {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async getCurrentTimestamp(): Promise<string> {
    return new Date().toISOString().replace(/[:.]/g, '-');
  }
}
