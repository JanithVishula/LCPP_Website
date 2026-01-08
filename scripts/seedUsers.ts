// Script to seed dummy users into MongoDB
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/leo_club';

interface User {
  name: string;
  email: string;
  password: string;
  role: 'member' | 'admin' | 'officer';
  membershipNumber: string;
  phone: string;
  joinedDate: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function seedUsers() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('leo_club');
    const usersCollection = db.collection<User>('users');

    // Clear existing users (optional - comment out if you want to keep existing data)
    await usersCollection.deleteMany({});
    console.log('Cleared existing users');

    // Dummy users with plain password 'password123' for all
    const dummyUsers = [
      {
        name: 'Saman Perera',
        email: 'saman@lcpp.lk',
        password: await hashPassword('password123'),
        role: 'admin' as const,
        membershipNumber: 'LCPP-001',
        phone: '+94771234567',
        joinedDate: new Date('2023-01-15'),
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Nimal Fernando',
        email: 'nimal@lcpp.lk',
        password: await hashPassword('password123'),
        role: 'officer' as const,
        membershipNumber: 'LCPP-002',
        phone: '+94772234567',
        joinedDate: new Date('2023-02-20'),
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kasun Silva',
        email: 'kasun@lcpp.lk',
        password: await hashPassword('password123'),
        role: 'member' as const,
        membershipNumber: 'LCPP-003',
        phone: '+94773234567',
        joinedDate: new Date('2023-03-10'),
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Malini Jayawardena',
        email: 'malini@lcpp.lk',
        password: await hashPassword('password123'),
        role: 'officer' as const,
        membershipNumber: 'LCPP-004',
        phone: '+94774234567',
        joinedDate: new Date('2023-04-05'),
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Dinesh Rajapaksa',
        email: 'dinesh@lcpp.lk',
        password: await hashPassword('password123'),
        role: 'member' as const,
        membershipNumber: 'LCPP-005',
        phone: '+94775234567',
        joinedDate: new Date('2023-05-12'),
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Chamari Wijesinghe',
        email: 'chamari@lcpp.lk',
        password: await hashPassword('password123'),
        role: 'member' as const,
        membershipNumber: 'LCPP-006',
        phone: '+94776234567',
        joinedDate: new Date('2023-06-18'),
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Tharindu Gunasekara',
        email: 'tharindu@lcpp.lk',
        password: await hashPassword('password123'),
        role: 'member' as const,
        membershipNumber: 'LCPP-007',
        phone: '+94777234567',
        joinedDate: new Date('2024-01-08'),
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Anushka Mendis',
        email: 'anushka@lcpp.lk',
        password: await hashPassword('password123'),
        role: 'member' as const,
        membershipNumber: 'LCPP-008',
        phone: '+94778234567',
        joinedDate: new Date('2024-02-14'),
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const result = await usersCollection.insertMany(dummyUsers);
    console.log(`✅ Successfully inserted ${result.insertedCount} users`);

    // Display users for reference
    console.log('\n📋 Created Users:');
    console.log('All passwords: password123\n');
    dummyUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Member #: ${user.membershipNumber}\n`);
    });

  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    await client.close();
    console.log('Database connection closed');
  }
}

// Run the seed function
seedUsers();
