#!/bin/bash

# Script to help run Supabase setup SQL
# This script provides instructions and can verify the setup

echo "=========================================="
echo "Supabase Table Setup"
echo "=========================================="
echo ""
echo "To run the setup SQL:"
echo ""
echo "1. Go to: https://supabase.com/dashboard"
echo "2. Select your project"
echo "3. Navigate to: SQL Editor"
echo "4. Copy the contents of: supabase_setup.sql"
echo "5. Paste and click 'Run'"
echo ""
echo "=========================================="
echo ""
echo "The SQL file is located at:"
echo "$(pwd)/supabase_setup.sql"
echo ""
echo "Would you like to open the SQL file? (y/n)"
read -r response

if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    if command -v code &> /dev/null; then
        code supabase_setup.sql
    elif command -v nano &> /dev/null; then
        nano supabase_setup.sql
    elif command -v vim &> /dev/null; then
        vim supabase_setup.sql
    else
        cat supabase_setup.sql
    fi
fi

