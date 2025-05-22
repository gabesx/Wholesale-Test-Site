# WooCommerce Wholesale Pricing Bug Reproduction

This repository contains the setup and reproduction steps for a WooCommerce wholesale pricing issue.

## Prerequisites

- Docker and Docker Compose installed
- Web browser
- Basic understanding of WordPress and WooCommerce

## Setup Instructions

1. Start the WordPress environment:
   ```bash
   docker-compose up -d
   ```

2. Access WordPress at http://localhost:8080 and complete the initial setup:
   - Choose your language
   - Set up admin credentials
   - Set up your site title

3. Install required plugins:
   - WooCommerce (from WordPress plugin directory)
   - Wholesale Prices for Testing (from provided link)

4. Configure WooCommerce:
   - Run through the WooCommerce setup wizard
   - Set up your store currency and location

5. Configure Wholesale Prices:
   - Go to WooCommerce > Settings > Wholesale Prices
   - Enable wholesale pricing
   - Set up a wholesale customer role

## Steps to Reproduce the Issue

1. Create a new product:
   - Go to Products > Add New
   - Set a regular price (e.g., $100)
   - Set a sale price (e.g., $80)
   - Set a wholesale price (e.g., $60)
   - Publish the product

2. Create a wholesale customer:
   - Go to Users > Add New
   - Create a new user with the wholesale customer role
   - Set a password and email

3. Test the issue:
   - Log out of admin
   - Log in as the wholesale customer
   - Visit the product page
   - Verify the wholesale price is displayed correctly
   - Add the product to cart
   - Check the cart - it will show the sale price instead of the wholesale price

## Expected vs Actual Results

### Expected Behavior
- When logged in as a wholesale customer, the cart should show the wholesale price ($60)

### Actual Behavior
- The cart shows the sale price ($80) instead of the wholesale price ($60)

## Additional Notes

- This issue has been reported to the plugin developers
- The issue occurs consistently across different product types
- The issue is reproducible in both the cart and checkout pages

## Support Resources

- [Wholesale Suite Knowledge Base](https://wholesalesuiteplugin.com/knowledge-base/)
- [WooCommerce Documentation](https://docs.woocommerce.com/) 