#!/bin/bash

# Activate virtual environment
source myenv/bin/activate

# Update package list
apt update

# Install MySQL Server
DEBIAN_FRONTEND=noninteractive apt install -y mysql-server

# Start MySQL service
service mysql start

# Secure MySQL root password and create databases
mysql -u root <<EOF
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Irahirs11@ittak!';
FLUSH PRIVILEGES;
CREATE DATABASE bsr;

EOF

echo "✅ MySQL setup completed. Root password set and databases created."

