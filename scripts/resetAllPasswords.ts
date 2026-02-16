// Script to reset ALL user passwords in MongoDB
// WARNING: This will set every user's password to the same value.
// Use only if you are absolutely sure, and change the password again afterwards.

import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/leo_club';
const DB_NAME = 'leo_club';

// New password for all users
const NEW_PASSWORD = '1234';

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function resetAllPasswords() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db(DB_NAME);
    const usersCollection = db.collection('users');

    const hashedPassword = await hashPassword(NEW_PASSWORD);

    const result = await usersCollection.updateMany(
      {},
      {
        $set: {
          password: hashedPassword,
          updatedAt: new Date(),
        },
      }
    );

    console.log(`🔐 Attempted to reset passwords for all users.`);
    console.log(`➡️  Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`);
  } catch (error) {
    console.error('❌ Error resetting passwords for all users:', error);
  } finally {
    await client.close();
    console.log('🔌 Database connection closed');
  }
}

resetAllPasswords();
