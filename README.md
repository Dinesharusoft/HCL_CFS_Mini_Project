# HCL-CFS Mini Project - UI and API Automation Tests

This project implements comprehensive UI and API automation tests using Playwright with TypeScript framework as specified in the requirements.

## Framework Used

- **Playwright** - Modern end-to-end testing framework
- **TypeScript** - For type-safe test development
- **Node.js** - Runtime environment

## Test Coverage

### Part A — UI Automation (Amazon.com)

1. **Home Page Verification**
   - Navigates to Amazon home page
   - Verifies key navigation elements (logo, search bar, cart, hamburger menu)
   - Captures full-page screenshot

2. **Category Navigation**
   - Interacts with navigation menu to access Electronics category
   - Verifies destination page loads correctly
   - Captures screenshot of category page

3. **Search Functionality**
   - Performs product search for "laptop"
   - Verifies search results page displays and contains search term
   - Captures screenshot of search results

### Part B — API Automation (Petstore API)

4. **Create a Resource**
   - Sends POST request to create new pet with dynamically generated test data
   - Verifies successful response with created pet details

5. **Read and Verify**
   - Retrieves created pet by ID
   - Verifies response contains expected data (ID and name match)

6. **Update a Resource**
   - Updates pet information via PUT request
   - Verifies response reflects updated values

7. **Delete and Confirm**
   - Deletes pet resource
   - Verifies resource is no longer retrievable (404 response)

## Setup Instructions

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Install Playwright browsers**
   ```bash
   npm run install-browsers
   ```

### Running Tests

#### Run all tests
```bash
npm test
```

#### Run only UI tests
```bash
npm run test:ui
```

#### Run only API tests
```bash
npm run test:api
```

#### Run tests in headed mode (visible browser)
```bash
npm run test:headed
```

#### View test reports
```bash
npm run report
```

## Project Structure

```
├── tests/
│   ├── ui/                          # UI automation tests
│   │   ├── pages/                   # Page Object Model files
│   │   ├── reusables/               # Common utility functions
│   │   ├── config/                  # Test configuration and data
│   │   ├── home-page.spec.ts        # Home page verification
│   │   ├── category-navigation.spec.ts # Category navigation
│   │   └── search-functionality.spec.ts # Search functionality
│   ├── api/                         # API automation tests
│   │   └── crud.spec.ts             # Petstore CRUD operations
│   └── README.md                     # Test structure documentation
├── verification/                     # Screenshots directory
├── .github/
│   └── workflows/
│       └── ci-cd.yml                # GitHub Actions workflow
├── playwright.config.ts             # Playwright configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies and scripts
├── .gitignore                        # Git ignore file
└── README.md                         # This file
```

## Configuration

- **Base URL**: https://www.amazon.in (for UI tests)
- **API Base URL**: https://petstore.swagger.io/v2 (for API tests)
- **Browsers**: Chromium, Firefox, WebKit (Safari)
- **Screenshots**: Saved in `verification/` directory
- **Reports**: HTML reports generated in `playwright-report/`

## Test Data

- **UI Tests**: Uses publicly accessible Amazon pages (no login required)
- **API Tests**: Uses dynamically generated test data with timestamps for uniqueness
- **Screenshots**: Automatically captured for visual verification

## CI/CD Integration

This project includes automated testing with GitHub Actions:

### Automated Workflow
- **Playwright CI**: Automatically runs all tests on push and pull requests to main branch
- **Test Results**: Stores HTML reports and screenshots as artifacts
- **Triggers**: Runs on PR creation and merge to main branch

### Quick Start with CI/CD
1. Fork/clone this repository
2. Push to your GitHub repository
3. GitHub Actions will automatically run tests
4. Check Actions tab for test results and download artifacts

## Notes

- All tests are designed to run against publicly accessible resources
- No authentication, payment, or account creation flows are tested
- API tests use dynamically generated data to avoid conflicts
- Screenshots are saved for UI test verification
- Tests are configured to run in parallel for faster execution

## Troubleshooting

If tests fail due to website changes or API blocking:
1. Check if Amazon has changed their UI elements
2. Verify Petstore API is accessible
3. Update selectors or endpoints as needed
4. Consider using alternative public websites/APIs if persistent blocking occurs
