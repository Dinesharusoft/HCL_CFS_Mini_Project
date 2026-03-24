import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const TestData = {
  urls: {
    amazon: process.env.AMAZON_BASE_URL || 'https://www.amazon.in',
    amazonElectronics: `${process.env.AMAZON_BASE_URL || 'https://www.amazon.in'}/electronics`,
    amazonMobiles: `${process.env.AMAZON_BASE_URL || 'https://www.amazon.in'}/mobile-phones`,
  },
  
  searchTerms: {
    laptop: process.env.AMAZON_SEARCH_TERM || 'laptop',
    mobile: 'mobile phone',
  },
  
  categories: {
    electronics: process.env.AMAZON_CATEGORY || 'Electronics',
    computers: 'Computers'
  },
  
  screenshotNames: {
    homePage: 'home-page',
    categoryNavigation: 'category-navigation',
    searchResults: 'search-results',
    electronicsPage: 'electronics-page',
  },
  
  verificationTexts: {
    electronics: 'electronics',
    mobile: 'mobile',
    laptop: 'laptop',
    amazon: 'amazon',
    search: 'search',
    deals: 'deals',
    customerService: 'customer service',
  },
  
  errorMessages: {
    elementNotFound: 'Element not found',
    pageLoadTimeout: 'Page load timeout',
    elementNotVisible: 'Element not visible',
    elementNotClickable: 'Element not clickable',
  },
};