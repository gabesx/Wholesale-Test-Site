#!/bin/bash

echo "Starting Docker containers..."
docker compose down -v
docker compose up -d

echo "Waiting for WordPress to be ready..."
sleep 30

echo "Installing WP-CLI..."
docker compose exec wordpress curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
docker compose exec wordpress chmod +x wp-cli.phar
docker compose exec wordpress mv wp-cli.phar /usr/local/bin/wp

echo "Installing WooCommerce..."
docker compose exec wordpress wp plugin install woocommerce --activate

echo "Installing Wholesale Prices plugin..."
# Note: You'll need to manually download and install the Wholesale Prices plugin
# as it's not available in the WordPress plugin directory

echo "Setup complete! Please visit http://localhost:8080 to complete the WordPress setup."
echo "Don't forget to:"
echo "1. Complete the WordPress installation"
echo "2. Run the WooCommerce setup wizard"
echo "3. Manually install the Wholesale Prices plugin"
echo "4. Configure the wholesale pricing settings" 