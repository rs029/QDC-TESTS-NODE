Feature: Order Management
  As a store admin
  I want to create different types of orders
  So that I can manage customer bookings effectively

  Background:
    Given the user is on the login page

  @smoke @order @per-piece
  Scenario: Create a Per Piece Order with Valid Details
    When the user enters the test email "S_admin"
    And enters the test password "admin@123"
    And enters the store code "SUB1"
    And clicks the login button
    Then the user should be redirected to the dashboard
    When the user selects dropdown and choose "Mobile"
    And Search for "9810755331"
    And clicks on the top result
    Then the user should be redirected to the customer details screen
    When clicks on "Create Order Per Pieces"
    Then the user should be redirected to the Garment Screen
    When choose any garment visible
    And clicks on "Add to Order"
    And clicks on "Close"
    Then the user should be redirected to the Booking Screen
    When clicks on "Save Order"
    Then the user should see a Package Details pop-up
    When clicks on "Skip"
    Then the user should be redirected to the Invoice Screen

  @smoke @order @per-weight
  Scenario: Create a Per Weight Order with Valid Details
    When the user enters the test email "S_admin"
    And enters the test password "admin@123"
    And enters the store code "SUB1"
    And clicks the login button
    Then the user should be redirected to the dashboard
    When the user selects dropdown and choose "Mobile"
    And Search for "9810755331"
    And clicks on the top result
    Then the user should be redirected to the customer details screen
    When clicks on "Create Order Per Weight"
    Then the user should be redirected to the per weight Booking Screen
    When double click on "Garment Details"
    Then the user should be redirected to the per weight Garment Screen
    When choose any garment visible
    And clicks on "Continue"
    Then the user should be redirected to the per weight Booking Screen
    When clicks on "Add To Cart"
    When clicks on "Checkout"
    When clicks on per Weight "Save Order"
    Then the user should see a Package Details pop-up
    When clicks on "Skip"
    Then the user should be redirected to the Invoice Screen