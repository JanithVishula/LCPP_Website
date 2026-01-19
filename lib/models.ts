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
  memberID?: string;
  firstName?: string;
  lastName?: string;
  address?: {
    line1?: string;
    line2?: string;
    line3?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  membershipType?: string;
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

export interface Event {
  _id?: ObjectId;
  title: string;
  description: string;
  date: Date;
  endDate?: Date;
  location: string;
  category: 'meeting' | 'project' | 'social' | 'fundraiser' | 'training' | 'other';
  maxAttendees?: number;
  registrationDeadline?: Date;
  rsvps: {
    userId: ObjectId;
    userName: string;
    userEmail: string;
    status: 'going' | 'maybe' | 'notgoing';
    respondedAt: Date;
  }[];
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceHour {
  _id?: ObjectId;
  userId: ObjectId;
  userName: string;
  projectId?: ObjectId;
  projectName: string;
  date: Date;
  hours: number;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: ObjectId;
  approvedAt?: Date;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MeetingMinute {
  _id?: ObjectId;
  title: string;
  date: Date;
  attendees: string[];
  agenda: string;
  discussion: string;
  decisions: string;
  actionItems: string;
  nextMeetingDate?: Date;
  fileUrl?: string;
  uploadedBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface Announcement {
  _id?: ObjectId;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  expiryDate?: Date;
  targetAudience: 'all' | 'members' | 'officers' | 'admin';
  createdBy: ObjectId;
  createdByName: string;
  pinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPost {
  _id?: ObjectId;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  author: ObjectId;
  authorName: string;
  tags: string[];
  published: boolean;
  publishedAt?: Date;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactMessage {
  _id?: ObjectId;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  repliedAt?: Date;
  repliedBy?: ObjectId;
  createdAt: Date;
}

export interface Payment {
  _id?: ObjectId;
  userId?: ObjectId;
  type: 'donation' | 'membership' | 'event';
  relatedId?: ObjectId; // event ID or donation ID
  amount: number;
  currency: string;
  paymentMethod: 'card' | 'bank' | 'cash' | 'other';
  paymentGateway?: string;
  transactionId?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payerName: string;
  payerEmail: string;
  payerPhone?: string;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}
