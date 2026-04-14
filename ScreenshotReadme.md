# Desktop Screenshot Automation - Quick Guide

## Overview
Desktop screenshots captured automatically at end of each UI test, stored in both verification and results folders.

## Installation

```bash
npm install screenshot-desktop
npm install --save-dev @types/screenshot-desktop
```

## Key Implementation

### CommonFunctions Method
```typescript
import screenshot from 'screenshot-desktop';
import { join } from 'path';

async takeDesktopScreenshot(fileName: string): Promise<string> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const screenshotName = `desktop-${fileName}-${timestamp}.png`;
  const screenshotPath = join(this.verificationPath, screenshotName);
  
  const imgBuffer = await screenshot({ format: 'png' });//This is capturing the entire current window, including other applications which is visible on the screen. As required use script to make the required app to be in focus before taking screenshot
  const fs = require('fs');
  fs.writeFileSync(screenshotPath, imgBuffer);
  
  return screenshotPath;
}
```

### Test Integration
```typescript
test.afterEach(async ({ page }, testInfo) => {
  const testName = testInfo.title || 'unknown-test';
  const testNameSanitized = testName.replace(/[^a-zA-Z0-9]/g, '-');
  await commonFunctions.takeDesktopScreenshot(testNameSanitized);
});
```

## Usage

```bash
# Run UI tests with screenshots
npm run test:ui

# Run specific test with browser visible
npm run test:ui -- --grep "Home Page Verification" --headed

# View report
npm run report
```

## Screenshot Locations
- **Verification**: `tests/ui/verification/`

## Naming Convention
`desktop-{test-name}-{timestamp}.png`

## Manual Capture
```typescript
await commonFunctions.takeDesktopScreenshot('custom-name');
```

## Features
- ✅ Captures entire desktop (not just browser)
- ✅ Timestamped filenames
- ✅ External app support
