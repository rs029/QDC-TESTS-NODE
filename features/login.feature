Feature: Login Module
  As a user
  I want to be able to log into the application
  So that I can access the dashboard and perform my tasks

  Background:
    Given the user is on the login page

  @positive @smoke
  Scenario: Successful login with valid credentials
    When the user enters the test email "S_admin"
    And enters the test password "admin@123"
    And enters the store code "SUB1"
    And clicks the login button
    Then the user should be redirected to the dashboard

  @negative @error-handling
  Scenario: Login with incorrect password
    When the user enters the test email "S_admin"
    And enters an incorrect password "1234"
    And enters the store code "SUB1"
    And clicks the login button
    Then the user should see an error message "Your user name or password is incorrect. Please try again."

  @negative @error-handling
  Scenario: Login with incorrect store code
    When the user enters the test email "S_admin"
    And enters the test password "admin@123"
    And enters the store code "s000"
    And clicks the login button
    Then the user should see an error message "Please enter correct store code."

  @negative @error-handling @non-existent
  Scenario: Login with non-existent user
    When the user enters an unregistered email "C_admin"
    And enters any password
    And clicks the login button
    Then the user should see an error message "- Branch Pin is a required field and cannot be left blank"

  @negative @validation
  Scenario: Login with empty fields
    When the email and password fields are left empty
    And the user clicks the login button
    Then the user should see validation messages "- User Id is a required field and cannot be left blank", "- Password is a required field and cannot be left blank", and "- Branch Pin is a required field and cannot be left blank"

  @session @regression
  Scenario: Session timeout and re-login
    Given the user is already logged in
    When the session expires due to inactivity
    Then the user should be redirected to the login page
    And upon re-login with "S_admin", "admin@123", and "SUB1"
    And the dashboard should be accessible again 