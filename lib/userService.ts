import bcrypt from 'bcryptjs';
import clientPromise from './mongodb';
import { User } from './models';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    const client = await clientPromise;
    const db = client.db('leo_club');
    const user = await db.collection<User>('users').findOne({ email: email.toLowerCase() });
    return user;
  } catch (error) {
    console.error('Error finding user:', error);
    return null;
  }
}

export async function createUser(userData: Omit<User, '_id' | 'createdAt' | 'updatedAt'>): Promise<User | null> {
  try {
    const client = await clientPromise;
    const db = client.db('leo_club');
    
    // Check if user already exists
    const existingUser = await findUserByEmail(userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(userData.password);

    const newUser = {
      ...userData,
      email: userData.email.toLowerCase(),
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection<User>('users').insertOne(newUser);
    
    return {
      ...newUser,
      _id: result.insertedId,
    };
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}
