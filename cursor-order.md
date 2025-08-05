<!-- 
This file was auto-generated from cursor.md template for Order module
Generated on: 2025-07-30T07:09:15.988Z
To regenerate: node generate-module-prompt.js Order cursor-order.md
-->

# Cursor AI Prompt: Enhanced Order Testing with Cucumber & C# (.NET)

## 🎯 **Objective**
Create a comprehensive Order testing framework using Cucumber `.feature` files and C# `.steps.js` files that incorporates all advanced testing patterns, error handling, and validation checks developed through extensive testing experience.

## 📋 **Requirements**

Convert the following Order test scenarios into:
1. **A Cucumber `.feature` file** in Gherkin format (`features/order.feature`)
2. **Matching C# Step Definitions** using Selenium WebDriver (`step-definitions/order.steps.js`)

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
// CSS Selectors to use

private const string USER_ID_SELECTOR = "#txtUserId";
private const string PASSWORD_SELECTOR = "#txtPassword";
private const string BRANCH_PIN_SELECTOR = "#txtBranchPin";
private const string LOGIN_BUTTON_SELECTOR = "#btnLogin";
private const string CUSTOMER_SEARCH_DROPDOWN_SELECTOR = "#drpDefaultCustomerSearch";
private const string CUSTOMER_SEARCH_SELECTOR = "#txtCustomer";
private const string ORDER_PER_PIECES_SELECTOR = "#lnkDrop";
private const string ORDER_PER_WEIGHT_SELECTOR = "#lnkLaundry";
private const string CONTINUE_SELECTOR = "#btnPopUpAddGarment";
private const string PER_WEIGHT_SAVE_ORDER_SELECTOR = "#btnCreateBooking";
private const string PACKAGE_POP_UP_SELECTOR = "#divPkgRchInfo";
private const string SKIP_SELECTOR = "#btnPkgSkip";
private const string CHECKOUT_SELECTOR = "#btnCreateOrder";
private const string RANDOM_GARMENT_SELECTOR = ".Garment-Binding";
private const string ADD_TO_ORDER_SELECTOR = "#achrAddItem";
private const string CLOSE_SELECTOR = "#btnCancel";
private const string SAVE_ORDER_SELECTOR = "#btnCreateOrder";
private const string ADD_TO_ORDER_SELECTOR = "#achrAddItem";
```

### **URLs & Navigation:**
*[CUSTOMIZE FOR YOUR APPLICATION]*
- **Base URL:** `https://cleankart.quickdrycleaning.com/Login`
- **Dashboard URL:** `https://cleankart.quickdrycleaning.com/sub1/App/home?EventClick=True`
- **Customer Details Screen URL:** `https://cleankart.quickdrycleaning.com/sub1/App/new_admin/CustomerDashboard?CCode=Cust617&IsTour=0&ClearContent=4-6-2025%2013:33:46`
- **Garment Screen URL:** `https://cleankart.quickdrycleaning.com/sub1/App/Bookings_New/frmbooking?CustBN=Cust617&IsTour=0&ClearContent=1-5-2025-17:44:44:306`
- **Booking Screen URL:** `https://cleankart.quickdrycleaning.com/sub1/App/Bookings_New/frmbooking?CustBN=Cust617&IsTour=0&ClearContent=1-5-2025-17:44:44:306`
- **Invoice Screen URL:** `https://cleankart.quickdrycleaning.com/sub1/App/ThermalPrinter/BookingSlip?BN=AW510-101%20Aug%202025&ClearContent=5-7-2025%2017:50:58`
- **Per Weight Booking Screen URL:** `https://cleankart.quickdrycleaning.com/sub1/App/Bookings_New/LaundryBooking?CustBN=Cust617&IsTour=0&ClearContent=1-5-2025-17:52:29:739`
- **Per Weight Garment Screen URL:** `https://cleankart.quickdrycleaning.com/sub1/App/Bookings_New/LaundryBooking?CustBN=Cust617&IsTour=0&ClearContent=1-5-2025-17:52:29:739`
- **Per Weight Invoice Screen URL:** `https://cleankart.quickdrycleaning.com/sub1/App/ThermalPrinter/BookingSlip?BN=AW512-101%20Aug%202025&ClearContent=5-7-2025%2018:1:49`

### **Test Data:**
*[CUSTOMIZE FOR YOUR MODULE]*
```csharp
// Use configuration/environment variables
private readonly string {VALID_USER} = ConfigurationManager.AppSettings["TEST_STORE_EMAIL"] ?? "S_admin";
private readonly string {VALID_PASSWORD} = ConfigurationManager.AppSettings["TEST_STORE_PASSWORD"] ?? "admin@123";
private readonly string {VALID_STORE_CODE} = ConfigurationManager.AppSettings["TEST_STORE_CODE"] ?? "SUB1";

// Example for Login Module:
// private readonly string VALID_USER = ConfigurationManager.AppSettings["TEST_USER"] ?? "S_admin";
// private readonly string VALID_PASSWORD = ConfigurationManager.AppSettings["TEST_PASSWORD"] ?? "admin@123";
// private readonly string VALID_STORE_CODE = ConfigurationManager.AppSettings["TEST_STORE_CODE"] ?? "SUB1";
```

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
├── Features/
│   └── Order.feature
├── StepDefinitions/
│   └── OrderSteps.cs
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