#!/bin/bash

# Read MySQL Connection Parameters from Environment Variables
MYSQL_HOST="localhost"
MYSQL_PORT="3306"
MYSQL_USER="${MYSQL_USER}"
MYSQL_PASSWORD="${MYSQL_PASSWORD}"
MYSQL_DATABASE="${MYSQL_DATABASE}"

# Function to check MySQL connection
check_mysql_connection() {
    mysql -h "$MYSQL_HOST" -P "$MYSQL_PORT" -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" -e "SELECT 1;" "$MYSQL_DATABASE" 2>/dev/null
}

echo "Checking MySQL database connectivity..."

if check_mysql_connection; then
    echo "MySQL database is ready!"
    exit 0
else
    echo "MySQL database is not ready."
    exit 1
fi
