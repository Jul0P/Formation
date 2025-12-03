# Use the official PHP Apache image (PHP 8.2 at time of writing)
FROM php:8.2-apache

# Enable required extensions
RUN docker-php-ext-install pdo pdo_mysql

# Copy source files
COPY src/ /var/www/html/

# Create uploads folder (writable)
RUN mkdir -p /var/www/html/uploads && chown -R www-data:www-data /var/www/html/uploads

EXPOSE 80