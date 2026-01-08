// User Model for MongoDB
import { ObjectId } from 'mongodb';

export interface User {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string; // This will be hashed
  role: 'member' | 'admin' | 'officer';
  membershipNumber?: string;
  phone?: string;
  joinedDate: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  _id?: ObjectId;
  title: string;
  date: string;
  description: string;
  category: string;
  images?: string[];
  participants?: number;
  impact?: string;
  year: string; // '2023-24', '2024-25', etc.
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface Donation {
  _id?: ObjectId;
  donorName: string;
  email: string;
  amount: number;
  message?: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentMethod?: string;
  createdAt: Date;
}
