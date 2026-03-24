# Test Structure

This directory contains all automation tests organized by type:

## 🎯 UI Automation Tests (`ui/`)

### Page Object Model Structure
- **`pages/`** - Page objects with web elements and actions
  - `amazon-home-page.ts` - Home page elements and methods
  - `amazon-electronics-page.ts` - Electronics page elements and methods
  - `amazon-search-results-page.ts` - Search results page elements and methods
- **`reusables/`** - Common utility functions
  - `common-functions.ts` - Shared helper methods
- **`config/`** - Test configuration and data
  - `test-data.ts` - Test data and constants

### Amazon.com UI Tests
- **`home-page.spec.ts`** - Home page verification with navigation elements
- **`category-navigation.spec.ts`** - Category navigation to Electronics sections  
- **`search-functionality.spec.ts`** - Product search functionality testing

### Features
- Page Object Model (POM) design pattern
- No hardcoded values - all data from configuration
- Reusable utility functions
- Screenshot capture for verification
- Cross-browser testing (Chrome, Firefox, Safari)
- Dynamic wait strategies
- Error handling and debugging

## API Automation Tests (`api/`)

### Petstore API Tests
- **`crud.spec.ts`** - Complete CRUD operations testing
  - Create new pet (POST)
  - Read pet by ID (GET)
  - Update pet information (PUT)
  - Delete pet (DELETE)

### Features
- Dynamic test data generation
- Complete data validation (no hardcoded values)
- Stored state management for verification
- Request/response validation
- Error handling verification
- API state management
- Comprehensive assertions

## Running Tests

### All Tests
```bash
npm test
```

### UI Tests Only
```bash
npm run test:ui
```

### API Tests Only
```bash
npm run test:api
```

### Headed Mode (Visible Browser)
```bash
npm run test:headed
```

## 📊 Test Reports

- **HTML Reports**: Generated in `playwright-report/`
- **Screenshots**: Saved in `verification/`
- **Test Artifacts**: Available in CI/CD pipeline

## 🔧 Configuration

Test configuration is managed in:
- **`playwright.config.ts`** - Main Playwright configuration
- **`package.json`** - Test scripts and dependencies
- **`.github/workflows/ci-cd.yml`** - GitHub Actions workflow

## Test Data

- **UI Tests**: Publicly accessible Amazon pages (no authentication)
- **API Tests**: Petstore public API with dynamic data
- **Screenshots**: Automatic capture for visual verification
- **Reports**: Comprehensive test execution summaries

## Best Practices

1. **Test Isolation**: Each test runs in fresh browser context
2. **Dynamic Data**: Use timestamps for unique test data
3. **Error Handling**: Comprehensive try/catch blocks
4. **Assertions**: Multiple validation points
5. **Documentation**: Clear test descriptions and comments
