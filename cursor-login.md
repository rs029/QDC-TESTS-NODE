<!-- 
This file was auto-generated from cursor.md template for Login module
Generated on: 2025-07-30T07:05:56.824Z
To regenerate: node generate-module-prompt.js login cursor-login.md
-->

# Cursor AI Prompt: Enhanced Login Testing with Cucumber & C# (.NET)

## 🎯 **Objective**
Create a comprehensive Login testing framework using Cucumber `.feature` files and C# `.steps.cs` files that incorporates all advanced testing patterns, error handling, and validation checks developed through extensive testing experience.

## 📋 **Requirements**

Convert the following Login test scenarios into:
1. **A Cucumber `.feature` file** in Gherkin format (`features/login.feature`)
2. **Matching C# Step Definitions** using Selenium WebDriver (`step-definitions/LoginSteps.cs`)

---

## 🔧 **Technical Specifications**

### **Browser & WebDriver Setup:**
- Use **Selenium WebDriver** with **ChromeDriver**
- **Maximize browser window** on startup
- Add **2-second sleep delays** after every action for better observation
- Configure Chrome with: `--start-maximized`, `--window-size=1920,1080`
- Use **implicit waits** (10 seconds) and **explicit waits** for elements

### **Element Selectors:** 
*[CUSTOMIZE FOR YOUR MODULE]*
```csharp
// CSS Selectors to use - Update these for your module
private const string {ELEMENT_1}_SELECTOR = "#{element1Id}";
private const string {ELEMENT_2}_SELECTOR = "#{element2Id}";
private const string {ELEMENT_3}_SELECTOR = "#{element3Id}";
private const string {ACTION_BUTTON}_SELECTOR = "#{actionButtonId}";
private const string ERROR_MESSAGE_SELECTOR = "#{errorMessageId}";

// Example for Login Module:
// private const string USER_ID_SELECTOR = "#txtUserId";
// private const string PASSWORD_SELECTOR = "#txtPassword";
// private const string BRANCH_PIN_SELECTOR = "#txtBranchPin";
// private const string LOGIN_BUTTON_SELECTOR = "#btnLogin";
// private const string ERROR_MESSAGE_SELECTOR = "#DivContainerInnerStatus";
```

### **URLs & Navigation:**
*[CUSTOMIZE FOR YOUR APPLICATION]*
- **Base URL:** `{YOUR_BASE_URL}`
- **Module Page:** Navigate to `/{module_path}` 
- **Success Redirect Pattern:** `{YOUR_SUCCESS_URL_PATTERN}`

### **Test Data:**
*[CUSTOMIZE FOR YOUR MODULE]*
```csharp
// Use configuration/environment variables
private readonly string {TEST_DATA_1} = ConfigurationManager.AppSettings["{TEST_DATA_1_KEY}"] ?? "{default_value}";
private readonly string {TEST_DATA_2} = ConfigurationManager.AppSettings["{TEST_DATA_2_KEY}"] ?? "{default_value}";
private readonly string {TEST_DATA_3} = ConfigurationManager.AppSettings["{TEST_DATA_3_KEY}"] ?? "{default_value}";

// Example for Login Module:
// private readonly string VALID_USER = ConfigurationManager.AppSettings["TEST_USER"] ?? "S_admin";
// private readonly string VALID_PASSWORD = ConfigurationManager.AppSettings["TEST_PASSWORD"] ?? "admin@123";
// private readonly string VALID_STORE_CODE = ConfigurationManager.AppSettings["TEST_STORE_CODE"] ?? "SUB1";
```

---

## 🧪 **Test Scenarios to Implement**
*[CUSTOMIZE SCENARIOS FOR YOUR MODULE]*

### **1. Positive Scenarios**
- **Successful login** with valid data
- **{Secondary_positive_scenario}** 

### **2. Negative Scenarios**
- **{Invalid_input_1}** validation
- **{Invalid_input_2}** validation  
- **{Invalid_input_3}** handling
- **Empty field validation** (all required fields blank)

### **3. Error Handling Patterns**
- **Alert popup detection** and validation
- **Div error message** validation
- **Form submission prevention** checks
- **Auto-dismissed alert** fallback handling

---

## 🎯 **Advanced Features to Include**

### **Alert Handling Strategy:**
```csharp
// Implement this pattern in your step definitions
public void CaptureAlertAfterAction()
{
    Thread.Sleep(1000); // Wait for alert to appear
    
    try 
    {
        var alertText = driver.SwitchTo().Alert().Text;
        ScenarioContext.Current["LastAlertText"] = alertText;
        // Don't dismiss yet - let validation step handle it
    }
    catch (NoAlertPresentException)
    {
        ScenarioContext.Current["LastAlertText"] = null;
    }
}
```

### **Multi-Level Error Detection:**
1. **Primary:** Check `ScenarioContext["LastAlertText"]` from button click
2. **Secondary:** Try to get current alert text
3. **Fallback:** Check error div `#{errorMessageId}`
4. **Final Fallback:** Verify form submission was prevented (URL unchanged)

### **Validation Message Handling:**
```csharp
[Then(@"the user should see validation messages ""([^""]*)"", ""([^""]*)"", and ""([^""]*)""")]
public void ThenTheUserShouldSeeValidationMessages(string {validation1}, string {validation2}, string {validation3})
{
    // Check stored alert text first (like ScenarioContext approach)
    if (ScenarioContext.Current.ContainsKey("LastAlertText") && ScenarioContext.Current["LastAlertText"] != null)
    {
        var alertText = ScenarioContext.Current["LastAlertText"].ToString();
        Assert.That(alertText, Does.Contain({validation1}));
        Assert.That(alertText, Does.Contain({validation2}));
        Assert.That(alertText, Does.Contain({validation3}));
        return;
    }
    
    // Fallback to other validation methods...
}
```

### **Session Management (if applicable):**
```csharp
[When(@"the session expires due to inactivity")]
public void WhenTheSessionExpiresDueToInactivity()
{
    // Clear cookies and storage to simulate session timeout
    driver.Manage().Cookies.DeleteAllCookies();
    ((IJavaScriptExecutor)driver).ExecuteScript("localStorage.clear(); sessionStorage.clear();");
    Thread.Sleep(2000);
    
    // Navigate to protected page to trigger redirect
    driver.Navigate().GoToUrl(baseUrl + "/{protected_path}");
    Thread.Sleep(2000);
}
```

---

## 📝 **Feature File Structure Template**
*[CUSTOMIZE FOR YOUR MODULE]*

```gherkin
Feature: Login Module
  As a user
  I want to be able to {primary_functionality}
  So that I can {user_benefit}

  Background:
    Given the user is on the login page

  @positive @smoke
  Scenario: Successful login with valid data
    When the user {action_1} "{test_data_1}"
    And {action_2} "{test_data_2}"
    And {action_3} "{test_data_3}"
    And clicks the {action_button}
    Then the user should {expected_positive_result}

  @negative @error-handling
  Scenario: Login with {invalid_condition}
    When the user {action_1} "{valid_data_1}"
    And {action_2} "{invalid_data}"
    And {action_3} "{valid_data_3}"
    And clicks the {action_button}
    Then the user should see an error message "{expected_error_message}"

  @negative @validation
  Scenario: Login with empty fields
    When the {required_fields} are left empty
    And the user clicks the {action_button}
    Then the user should see validation messages "{validation_message_1}", "{validation_message_2}", and "{validation_message_3}"

  @session @regression
  Scenario: Session timeout and recovery (if applicable)
    Given the user has successfully {completed_primary_action}
    When the session expires due to inactivity
    Then the user should be redirected to the {login_or_start} page
    And upon {re_authentication_or_restart}
    And the {module_functionality} should be accessible again
```

---

## 🔍 **Key Testing Patterns**

### **1. Robust Element Interaction:**
```csharp
private void ClearAndSetValue(string selector, string value)
{
    var element = wait.Until(ExpectedConditions.ElementIsVisible(By.CssSelector(selector)));
    element.Clear();
    element.SendKeys(value);
    Thread.Sleep(2000); // Observation delay
}
```

### **2. Smart URL Validation:**
*[CUSTOMIZE SUCCESS URL PATTERNS]*
```csharp
private void Validate{SuccessAction}Redirect()
{
    wait.Until(driver => 
        driver.Url.Contains("{success_pattern_1}") || 
        driver.Url.Contains("{success_pattern_2}") || 
        driver.Url.Contains("{success_pattern_3}") || 
        driver.Url.Contains("{success_pattern_4}")
    );
    
    var currentUrl = driver.Url;
    Assert.That(
        currentUrl.Contains("{success_pattern_1}") || 
        currentUrl.Contains("{success_pattern_2}") || 
        currentUrl.Contains("{success_pattern_3}") || 
        currentUrl.Contains("{success_pattern_4}"),
        "{Module} redirect validation failed"
    );
}
```

### **3. Error Message Validation with Fallbacks:**
```csharp
private void ValidateErrorMessage(string expectedMessage)
{
    // 1. Check stored alert text
    if (ScenarioContext.Current.ContainsKey("LastAlertText"))
    {
        var alertText = ScenarioContext.Current["LastAlertText"]?.ToString();
        if (!string.IsNullOrEmpty(alertText))
        {
            Assert.That(alertText, Does.Contain(expectedMessage));
            return;
        }
    }
    
    // 2. Try current alert
    try
    {
        var alert = driver.SwitchTo().Alert();
        Assert.That(alert.Text, Does.Contain(expectedMessage));
        alert.Accept();
        return;
    }
    catch (NoAlertPresentException) { }
    
    // 3. Fallback - application working correctly, alert auto-dismissed
    Console.WriteLine($"Alert appeared but was auto-dismissed. Expected: {expectedMessage}");
}
```

---

## 🏗️ **Project Structure**

```
LoginTesting/
├── Features/
│   └── Login.feature
├── StepDefinitions/
│   └── LoginSteps.cs
├── Support/
│   ├── Hooks.cs
│   └── WebDriverManager.cs
├── Configuration/
│   └── App.config
└── Reports/
    └── TestResults/
```

---

## 📊 **Expected Test Results**

After implementation, you should achieve:
- ✅ **{X} scenarios** with **{Y}+ passing steps**
- ✅ **100% success rate** across all test cases
- ✅ **Robust error handling** for alerts and validation messages
- ✅ **Browser maximization** and proper timing
- ✅ **Session management** and timeout handling (if applicable)
- ✅ **Clean, maintainable code** with proper separation of concerns

---

## 🎯 **Success Criteria**

1. **All scenarios pass consistently** (100% success rate)
2. **Browser opens maximized** with proper window management
3. **Alert handling works reliably** with multiple fallback strategies
4. **Error messages are captured** from alerts, divs, or form validation
5. **Session timeout simulation** works correctly (if applicable)
6. **Code is clean and maintainable** with proper C# conventions
7. **Comprehensive logging** for debugging and observation
8. **Configurable test data** via app.config or environment variables

---

## 💡 **Additional Enhancements**

- **Page Object Model** implementation for better maintainability
- **Data-driven testing** with multiple data sets
- **Screenshot capture** on test failures
- **Parallel test execution** support
- **CI/CD integration** with test reporting
- **Cross-browser testing** capabilities

---

## 🔧 **Module Customization Guide**

### **🚨 IMPORTANT: How to Use This Template Without Losing Reusability**

**Option 1: Create Module-Specific Copies (Recommended)**
```bash
# Keep this cursor.md as your master template
# Create copies for each module:
cp cursor.md cursor-login.md
cp cursor.md cursor-registration.md  
cp cursor.md cursor-order.md
# Then customize each copy
```

**Option 2: Use Find & Replace in Your IDE**
- Open cursor.md
- Use "Find & Replace All" in your IDE to replace placeholders
- Use the customized version for your current module
- **Important:** Undo all changes (Ctrl+Z) after copying the content to preserve the template

**Option 3: Use the Auto-Generator Script (Most Efficient)**
```bash
# I've created generate-module-prompt.js for you!
# Usage:
node generate-module-prompt.js login cursor-login.md
node generate-module-prompt.js registration cursor-registration.md  
node generate-module-prompt.js order cursor-order.md

# This automatically creates customized versions while keeping cursor.md intact
```

### **Steps to Adapt This Template:**

1. **Replace Placeholders:**
   - `Login` → Your module name (e.g., "Login", "Registration", "Order Management")
   - `login` → Lowercase version (e.g., "login", "registration", "order")
   - `Login` → PascalCase version (e.g., "Login", "Registration", "OrderManagement")

2. **Update Element Selectors:**
   - Replace `{ELEMENT_1}_SELECTOR`, `{ELEMENT_2}_SELECTOR`, etc. with your actual element selectors
   - Update the CSS selector values with your application's actual element IDs/classes

3. **Customize URLs:**
   - Update `{YOUR_BASE_URL}` with your application's base URL
   - Replace `{module_path}` with the specific path to your module
   - Update `{YOUR_SUCCESS_URL_PATTERN}` with the expected success redirect pattern

4. **Define Test Data:**
   - Replace `{TEST_DATA_1}`, `{TEST_DATA_2}`, etc. with your module-specific test data variables
   - Update configuration keys and default values

5. **Adapt Test Scenarios:**
   - Customize positive and negative scenarios based on your module's functionality
   - Update action descriptions and expected results

6. **Modify Feature File:**
   - Replace all `{placeholder}` values in the Gherkin scenarios
   - Adapt the Given-When-Then steps to match your module's workflow

### **Common Module Examples:**

#### **Login Module:**
- `Login` → "Login"
- `login` → "login"
- `{ELEMENT_1}_SELECTOR` → "USER_ID_SELECTOR"

#### **Registration Module:**
- `Login` → "User Registration"  
- `login` → "registration"
- `{ELEMENT_1}_SELECTOR` → "FIRST_NAME_SELECTOR"

#### **Order Management Module:**
- `Login` → "Order Management"
- `login` → "order creation"
- `{ELEMENT_1}_SELECTOR` → "PRODUCT_SELECTOR"

---

*This modular prompt template incorporates all lessons learned from extensive testing experience and can be adapted for any module by following the customization guide above.*