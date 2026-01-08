// Script to import Leo Club members from CSV to MongoDB
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/leo_club';

interface LeoMember {
  name: string;
  email: string;
  password: string;
  role: 'member' | 'admin' | 'officer';
  membershipNumber: string;
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
  joinedDate: Date;
  active: boolean;
  membershipType?: string;
  createdAt: Date;
  updatedAt: Date;
}

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

function cleanEmail(email: string): string | null {
  if (!email || email === '<br><br><br><br>' || !email.includes('@')) {
    return null;
  }
  return email.toLowerCase().trim();
}

function cleanPhone(phone?: string): string | undefined {
  if (!phone) return undefined;
  const cleaned = phone.replace(/[^\d+]/g, '');
  return cleaned || undefined;
}

async function importMembers() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB successfully!\n');

    const db = client.db('leo_club');
    const usersCollection = db.collection<LeoMember>('users');

    const csvPath = path.join(process.cwd(), 'public', 'Member_Contact_Information_2026-01-08.csv');
    const members: LeoMember[] = [];
    const hashedPassword = await hashPassword('Leo@2026');

    return new Promise<void>((resolve, reject) => {
      let skipLines = 11; // Skip header rows

      fs.createReadStream(csvPath)
        .pipe(csvParser())
        .on('data', (row) => {
          if (skipLines > 0) {
            skipLines--;
            return;
          }

          // Get the data from the row
          const memberID = row['Unnamed: 4'];
          const firstName = row['Unnamed: 7'];
          const lastName = row['Unnamed: 8'];
          const addressLine1 = row['Unnamed: 11'];
          const addressLine2 = row['Unnamed: 12'];
          const addressLine3 = row['Unnamed: 13'];
          const city = row['Unnamed: 14'];
          const state = row['Unnamed: 15'];
          const postalCode = row['Unnamed: 16'];
          const country = row['Unnamed: 17'];
          const personalEmail = row['Unnamed: 23'];
          const mobile = row['Unnamed: 27'];
          const homePhone = row['Unnamed: 28'];
          const membershipType = row['Unnamed: 31'];

          // Skip invalid rows
          if (!firstName || !lastName || !memberID || memberID === 'Total') return;

          const fullName = `${firstName} ${lastName}`;
          const email = cleanEmail(personalEmail);
          
          if (!email) return;

          // Determine role
          let role: 'member' | 'admin' | 'officer' = 'member';
          if (members.length === 0) role = 'admin';
          else if (members.length < 3) role = 'officer';

          const member: LeoMember = {
            name: fullName,
            email,
            password: hashedPassword,
            role,
            membershipNumber: `LCPP-${memberID}`,
            phone: cleanPhone(mobile || homePhone),
            memberID,
            firstName,
            lastName,
            address: {
              line1: addressLine1,
              line2: addressLine2,
              line3: addressLine3,
              city,
              state,
              postalCode,
              country
            },
            membershipType,
            joinedDate: new Date('2024-01-01'),
            active: membershipType?.includes('Active') || false,
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          members.push(member);
        })
        .on('end', async () => {
          try {
            if (members.length === 0) {
              console.log('⚠️ No valid members found in CSV');
              await client.close();
              resolve();
              return;
            }

            // Clear existing users
            await usersCollection.deleteMany({});
            console.log('🗑️ Cleared existing users\n');

            // Insert all members
            const result = await usersCollection.insertMany(members);
            console.log(`✅ Successfully inserted ${result.insertedCount} members\n`);

            // Display summary
            console.log('📊 Import Summary:');
            console.log(`Total Members: ${members.length}`);
            console.log(`Admins: ${members.filter(m => m.role === 'admin').length}`);
            console.log(`Officers: ${members.filter(m => m.role === 'officer').length}`);
            console.log(`Regular Members: ${members.filter(m => m.role === 'member').length}`);
            console.log(`\n🔐 Default Password for all members: Leo@2026\n`);

            // Show first 5 members as sample
            console.log('👥 Sample Members (first 5):');
            members.slice(0, 5).forEach((member, index) => {
              console.log(`\n${index + 1}. ${member.name}`);
              console.log(`   Email: ${member.email}`);
              console.log(`   Role: ${member.role}`);
              console.log(`   Member ID: ${member.membershipNumber}`);
              console.log(`   Phone: ${member.phone || 'N/A'}`);
              console.log(`   City: ${member.address?.city || 'N/A'}`);
            });

            await client.close();
            console.log('\n✅ Database connection closed');
            resolve();
          } catch (error) {
            reject(error);
          }
        })
        .on('error', (error) => {
          reject(error);
        });
    });

  } catch (error) {
    console.error('❌ Error importing members:', error);
    await client.close();
  }
}

// Run the import
importMembers();
