# Agile Software Practice - Assignment 1.
__Name:__ Zihan Huang

__Demo:__ https://youtu.be/NPMzCIcgpFA

This repository contains the containerization of the mukti-container application illustrated below.

![](../../../../Typora/img/arch.png)

## RUN 

### 1. Configure Environment Variables

Make sure the `.env` file in your project directory contains the correct environment variable settings needed for running the Docker containers.

`.env`

```.env
MONGODB_USERNAME=
MONGODB_PASSWORD=
MONGODB_DATABASE=tmdb_movies
```

especially we should pay attention to the name of database, we should only use the tmdb_movies.

I found that the API requests explicitly point to the database and also use `tmdb_movies` as the target database name.

### 2. Build and Start Docker Containers

Execute the following command in the project root directory to start all services:

`docker-compose -f .\docker-compose.yml up -d ` 



## Network 

-   api_db_net: movies-api and mongo
-   api_redis_net: movies-api and redis 
-   express_db_net: mongo and mongo-express 



### Database Seeding.

To streamline the initialization process, the application's database is seeded automatically using a script named `seed-database.sh`. This script imports JSON data from `seeding.json` into a MongoDB collection, ensuring that the database is populated with rich content for testing or demonstration purposes.

- **Script**: `seed-database.sh`
- **Data File**: `seeding.json`

**Process**:

1. The script initiates the seeding with `mongoimport` using authentication details.
2. It connects to a MongoDB instance and imports the data into the `moviesDB` database under the `movies` collection.
3. On successful execution, the script outputs confirmation; otherwise, it reports an error.

```bash
#!/bin/bash

echo "Starting database seeding..."

mongoimport --host mongo --username admin --password password --db tmdb_movies --collection movies --type json --file seeding.json --jsonArray --authenticationDatabase=admin

if [ $? -eq 0 ]; then
  echo "Database seeding completed successfully."
else
  echo "Error occurred during database seeding."
fi

```

**`mongoimport`**: This is a MongoDB tool used to import data from a JSON, CSV, or TSV file into a MongoDB database.

**`--host mongo`**: Specifies the host where MongoDB is running. In this case, it's set to `mongo`, which is likely the name of the MongoDB container or service in a Docker or networked environment.

**`--username admin`**: Specifies the username used for authentication.

**`--password password`**: Provides the password associated with the `admin` user.

**`--db tmdb_movies `**: Indicates the target database where the data will be imported. Here, the database is named `moviesDB`.

**`--collection movies`**: Specifies the collection within the database into which the data will be imported. This collection is named `movies`.

**`--type json`**: Indicates that the type of data being imported is JSON.

**`--file seeding.json`**: Specifies the file path for the input data. The data will be imported from the `seeding.json` file.

**`--jsonArray`**: Informs `mongoimport` that the input JSON file contains an array of documents. Without this option, `mongoimport` would expect each document to be on a separate line.

**`--authenticationDatabase=admin`**: Specifies that the authentication should be performed against the `admin` database, where the user credentials are stored.
