# Feature: Admin Product Management
#   As an admin user
#   I want to be able to create a new product
#   So that it appears in the product list with the correct prices

# @createProducttest
# Background:
#   Given I am on the login page
#   And I log in as "administrator" to Wholesale Test Site
#   And I should be logged in successfully
#   And I go to the products admin page
#   When Admin fills in the product baseline with name "Fixed Wholesale Discount", regular price "100000", and sale price "70000"
#   And Admin sets "fixed" wholesale discount to "60000"
#   And Admin publishes the product
#   And I log out

# @createProducttest
# Scenario Outline: Check Fixed Wholesale Discount for each role
#   And I am on the login page
#   And I log in as "<role>" to Wholesale Test Site
#   And I visit the saved product page
#   Then I should see the product prices: regular "100000", sale "70000" and wholesale value "<wholesale_price>"
#   And I log out

#   Examples:
#     | role               | wholesale_price      |
#     | wholesale customer | 60000               | 
#     | shop manager       | no wholesale price  | 
#     | customer           | no wholesale price  | 
#     | subscriber         | no wholesale price  | 
#     | contributor        | no wholesale price  | 
#     | author             | no wholesale price  | 
#     | editor             | no wholesale price  | 
#     | administrator      | no wholesale price  | 
    

#   # @customerView
#   # Scenario: Customer views the created product page and sees correct prices
#   #   Given I am on the login page
#   #   When I click on the login button
#   #   And I log in as admin
#   #   Then I should be logged in successfully
#   #   When I go to the products admin page
#   #   And I add a new product with name "Test Product" and prices regular "100000", sale "80000", wholesale "70000"
#   #   And I log out
#   #   Given I am on the login page
#   #   When I click on the login button
#   #   And I log in as customer
#   #   Then I should be logged in successfully
#   #   When I visit the product page for "Test Product"
#   #   Then I should see the product prices: regular "100000", sale "80000", wholesale "70000"

#   # @noWholesale
#   # Scenario: Admin creates a new product without a wholesale price
#   #   Given I am on the login page
#   #   When I click on the login button
#   #   And I log in as admin
#   #   Then I should be logged in successfully
#   #   When I go to the products admin page
#   #   And I add a new product with name "No Wholesale Product" and prices regular "120000", sale "90000", wholesale ""
#   #   Then I should see the product "No Wholesale Product" with regular price "120000" and sale price "90000" and no wholesale price 