#!/bin/bash

echo "Starting database seeding..."

mongoimport --host mongo --username admin --password password --db tmdb_movies --collection movies --type json --file seeding.json --jsonArray --authenticationDatabase=admin

if [ $? -eq 0 ]; then
  echo "Database seeding completed successfully."
else
  echo "Error occurred during database seeding."
fi
