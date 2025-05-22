@login @login_functionality
Feature: Login Functionality
  As a user
  I want to be able to log in to the application
  So that I can access my account

  @valid_login
  Scenario: Successful login with valid credentials
    Given I am on the login page
    And I enter valid credentials
    And I should be logged in successfully
    And I log out
    
  @invalid_login
  Scenario: Failed login with invalid credentials
    Given I am on the login page
    And I enter invalid credentials
    Then I should see an error message

  @valid_login_with_role @check_product_prices
  Scenario Outline: Login as <role> to Wholesale Test Site
    Given I am on the login page
    When I log in as "<role>" to Wholesale Test Site
    Then I should be logged in successfully
    And I log out

    Examples:
      | role               |
      | shop manager       |
      | customer           |
      | wholesale customer |
      | subscriber         |
      | contributor        |
      | author             |
      | editor             |
      | administrator      |
