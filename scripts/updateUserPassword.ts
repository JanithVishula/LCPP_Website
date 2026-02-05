// Script to update a specific user's password in MongoDB
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/leo_club';

const TARGET_EMAIL = 'jvishula35@gmail.com';
const NEW_PASSWORD = 'abcd1234';

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function updateUserPassword() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db('leo_club');
    const usersCollection = db.collection('users');

    const hashedPassword = await hashPassword(NEW_PASSWORD);

    const result = await usersCollection.updateOne(
      { email: TARGET_EMAIL.toLowerCase() },
      {
        $set: {
          password: hashedPassword,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      console.log(`⚠️ No user found with email: ${TARGET_EMAIL}`);
    } else if (result.modifiedCount === 0) {
      console.log(`ℹ️ User found but password was not modified (may already be the same).`);
    } else {
      console.log(`✅ Password updated successfully for ${TARGET_EMAIL}`);
    }
  } catch (error) {
    console.error('❌ Error updating user password:', error);
  } finally {
    await client.close();
    console.log('🔌 Database connection closed');
  }
}

updateUserPassword();
