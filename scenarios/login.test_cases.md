# ✅ Login Module – Test Scenarios

These scenarios validate the login flow for different users and edge cases.

> ⚠️ All credential values are placeholder variables.
> Actual test values are loaded securely from environment variables in automation code.

---

## ✅ Scenario 1: Successful login with valid credentials

**Given** the user is on the login page  
**When** the user enters the test email "S_admin"  
**And** enters the test password "admin@123"  
**And** enters the store code "SUB1"
**And** clicks the login button  
**Then** the user should be redirected to the dashboard

---

## 🚫 Scenario 2: Login with incorrect password

**Given** the user is on the login page  
**When** the user enters the test email "S_admin"  
**And** enters an incorrect password "1234" 
**And** enters the store code "SUB1"
**And** clicks the login button  
**Then** the user should see an error message "Your user name or password is incorrect. Please try again."

---

## 🚫 Scenario 3: Login with incorrect store code

**Given** the user is on the login page  
**When** the user enters the test email "S_admin"  
**And** enters an incorrect password "admin@123" 
**And** enters the store code "s000"
**And** clicks the login button  
**Then** the user should see an error message "Please enter correct store code."

---

## 🚫 Scenario 4: Login with non-existent user

**Given** the user is on the login page  
**When** the user enters an unregistered email "C_admin" 
**And** enters any password  
**And** clicks the login button  
**Then** the user should see an error message "- Branch Pin is a required field and cannot be left blank"

---

## 🔒 Scenario 5: Login with empty fields

**Given** the user is on the login page  
**When** the email and password fields are left empty  
**And** the user clicks the login button  
**Then** the user should see validation messages "- User Id is a required field and cannot be left blank", "- Password is a required field and cannot be left blank", and "- Branch Pin is a required field and cannot be left blank"

---

## 🔄 Scenario 6: Session timeout and re-login

**Given** the user is already logged in  
**When** the session expires due to inactivity  
**Then** the user should be redirected to the login page  
**And** upon re-login with "S_admin", "admin@123", and "SUB1"
**And** the dashboard should be accessible again