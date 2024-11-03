const { MongoClient } = require('mongodb');
const fs = require('fs');

const uri = 'mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@mongo:27017/moviesDB'; 
const client = new MongoClient(uri);

async function seedDatabase() {
  try {
    await client.connect();
    const db = client.db('moviesDB');
    const collection = db.collection('movies');

    const data = JSON.parse(fs.readFileSync('seeding.json', 'utf-8'));
    await collection.insertMany(data);

    console.log('Database seeding completed successfully.');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await client.close();
  }
}

seedDatabase();
