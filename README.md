# Login Test Automation

This project contains automated test scenarios for the login module using Cucumber, WebDriverIO, and Chai assertions.

## 📁 Project Structure

```
qdc-tests-node/
├── features/
│   └── login.feature          # Cucumber feature file
├── step-definitions/
│   └── login.steps.js         # WebDriverIO step definitions
├── support/
│   └── hooks.js              # Browser lifecycle hooks
├── scenarios/
│   └── login.test_cases.md   # Original test cases (Markdown)
└── wdio.conf.js              # WebDriverIO configuration
```

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
# Test Credentials
TEST_USER=S_admin
TEST_PASSWORD=admin@123
TEST_STORE_CODE=SUB1

# Invalid test credentials for negative testing
INVALID_USER=C_admin
INVALID_PASSWORD=1234
INVALID_STORE_CODE=s000

# Application URLs
BASE_URL=https://cleankart.quickdrycleaning.com
DASHBOARD_URL=https://cleankart.quickdrycleaning.com/sub1/App/home?EventClick=True

# Test Configuration
BROWSER=chrome
HEADLESS=false
TIMEOUT=10000
```

### 3. Run Tests

#### Run all tests:
```bash
npm run wdio
```

#### Run specific test categories:
```bash
# Run only smoke tests
npm run wdio -- --cucumberOpts.tags="@smoke"

# Run only negative tests
npm run wdio -- --cucumberOpts.tags="@negative"

# Run only session tests
npm run wdio -- --cucumberOpts.tags="@session"
```

## 🧪 Test Scenarios

### ✅ Positive Tests
- **Successful login with valid credentials** (`@positive @smoke`)

### ❌ Negative Tests
- **Login with incorrect password** (`@negative @error-handling`)
- **Login with incorrect store code** (`@negative @error-handling`)
- **Login with non-existent user** (`@negative @error-handling`)
- **Login with empty fields** (`@negative @validation`)

### ⏰ Session Tests
- **Session timeout and re-login** (`@session @regression`)

## 🔧 Technical Details

### Selectors Used
- User ID: `#txtUserId`
- Password: `#txtPassword`
- Branch Pin: `#txtBranchPin`
- Login Button: `#loginBtn`
- Error Messages: `.error-message, .alert-danger, .text-danger`

### Key Features
- **Environment Variable Support**: Credentials loaded from `process.env`
- **Chai Assertions**: Robust assertion library for validations
- **Screenshot Capture**: Automatic screenshots on test failures
- **Browser Lifecycle Management**: Proper setup and teardown with hooks
- **Tag-based Execution**: Run specific test categories using tags
- **Error Handling**: Comprehensive error handling and logging

### Browser Configuration
- **Browser**: Chrome (configurable)
- **Window Size**: 1920x1080
- **Timeouts**: 
  - Implicit: 10 seconds
  - Page Load: 30 seconds
  - Script: 30 seconds

## 📊 Test Reports

Test results and screenshots are automatically generated:
- Screenshots saved for failed scenarios
- Console logging with emojis for better readability
- Detailed error messages and stack traces

## 🔒 Security Notes

- Credentials are loaded from environment variables for security
- Default values are provided for development but should be overridden in production
- No hardcoded credentials in the codebase
- Session data is properly cleared between tests

## 🐛 Troubleshooting

### Common Issues

1. **Element not found errors**: Check if selectors match the actual application
2. **Timeout errors**: Increase timeout values in `wdio.conf.js`
3. **Browser not starting**: Ensure Chrome is installed and accessible
4. **Environment variables not loading**: Verify `.env` file exists and is properly formatted

### Debug Mode
Run tests with debug logging:
```bash
npm run wdio -- --logLevel debug
```

## 📝 Contributing

When adding new test scenarios:
1. Add the scenario to `features/login.feature`
2. Implement step definitions in `step-definitions/login.steps.js`
3. Add appropriate tags for categorization
4. Update this README if needed

## 📞 Support

For issues or questions:
1. Check the console output for detailed error messages
2. Verify environment variables are set correctly
3. Ensure the application is accessible at the specified URL 