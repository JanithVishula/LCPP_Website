// Quick script to verify MongoDB connection and data
import { MongoClient } from 'mongodb';

const MONGODB_URI = 'mongodb://localhost:27017/leo_club';

async function checkDatabase() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB successfully!\n');

    const db = client.db('leo_club');
    
    // Count users
    const userCount = await db.collection('users').countDocuments();
    console.log(`📊 Total users in database: ${userCount}\n`);

    if (userCount > 0) {
      console.log('👥 Sample users:');
      const users = await db.collection('users')
        .find({})
        .project({ name: 1, email: 1, role: 1, membershipNumber: 1, _id: 0 })
        .limit(5)
        .toArray();
      
      console.table(users);
    } else {
      console.log('⚠️ No users found in database!');
      console.log('Run: npm run seed');
    }

    // List all collections
    const collections = await db.listCollections().toArray();
    console.log('\n📁 Collections in database:');
    collections.forEach(coll => console.log(`  - ${coll.name}`));

  } catch (error) {
    console.error('❌ Error connecting to MongoDB:');
    console.error(error);
    console.log('\n💡 Make sure MongoDB is running:');
    console.log('   Run: net start MongoDB (as Administrator)');
    console.log('   Or: mongod');
  } finally {
    await client.close();
  }
}

checkDatabase();
