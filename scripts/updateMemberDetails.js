const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'leo_club';

// Sample member details to add
const memberUpdates = [
  { email: 'jvishula35@gmail.com', phone: '+94 71 123 4567', membershipNumber: 'LEO-2026-001' },
  { email: 'onelherath0918@gmail.com', phone: '+94 77 234 5678', membershipNumber: 'LEO-2026-002' },
  { email: 'induwarahasindu2022@gmail.com', phone: '+94 76 345 6789', membershipNumber: 'LEO-2026-003' },
  { email: 'matheesharavihara@gmail.com', phone: '+94 75 456 7890', membershipNumber: 'LEO-2026-004' },
  { email: 'bhagyasupunboy@gmail.com', phone: '+94 74 567 8901', membershipNumber: 'LEO-2026-005' },
  { email: 'sanaboy2332@gmail.com', phone: '+94 73 678 9012', membershipNumber: 'LEO-2026-006' },
  { email: 'savirusenevi@icloud.com', phone: '+94 72 789 0123', membershipNumber: 'LEO-2026-007' },
  { email: 'gimhaniwickramarathna882@gmail.com', phone: '+94 71 890 1234', membershipNumber: 'LEO-2026-008' },
];

async function updateMemberDetails() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB\n');

    const db = client.db(dbName);
    const usersCollection = db.collection('users');

    let updated = 0;
    let notFound = 0;

    for (const update of memberUpdates) {
      const result = await usersCollection.updateOne(
        { email: update.email },
        { 
          $set: { 
            phone: update.phone,
            membershipNumber: update.membershipNumber
          } 
        }
      );

      if (result.matchedCount > 0) {
        console.log(`✅ Updated: ${update.email}`);
        console.log(`   Phone: ${update.phone}`);
        console.log(`   Membership: ${update.membershipNumber}\n`);
        updated++;
      } else {
        console.log(`⚠️  Not found: ${update.email}\n`);
        notFound++;
      }
    }

    // Update remaining members with auto-generated data
    const allUsers = await usersCollection.find({}).toArray();
    let autoUpdated = 0;

    for (let i = 0; i < allUsers.length; i++) {
      const user = allUsers[i];
      
      // Skip if already has phone and membership number
      if (user.phone && user.membershipNumber) {
        continue;
      }

      const memberNumber = String(i + 1).padStart(3, '0');
      const phoneDigits = String(Math.floor(Math.random() * 90000000) + 10000000);
      
      await usersCollection.updateOne(
        { _id: user._id },
        {
          $set: {
            phone: user.phone || `+94 ${phoneDigits.substring(0, 2)} ${phoneDigits.substring(2, 5)} ${phoneDigits.substring(5)}`,
            membershipNumber: user.membershipNumber || `LEO-2026-${memberNumber}`
          }
        }
      );
      
      autoUpdated++;
    }

    console.log('📊 Summary:');
    console.log(`   ✅ Manually updated: ${updated}`);
    console.log(`   ⚠️  Not found: ${notFound}`);
    console.log(`   🤖 Auto-updated: ${autoUpdated}`);
    console.log(`   📝 Total members: ${allUsers.length}`);

    // Show sample of updated members
    console.log('\n📋 Sample Updated Members:');
    const sample = await usersCollection.find({}).limit(10).toArray();
    sample.forEach(user => {
      const roleIcon = user.role === 'admin' ? '👑' : user.role === 'officer' ? '👮' : '👤';
      console.log(`${roleIcon} ${user.name}`);
      console.log(`   📧 ${user.email}`);
      console.log(`   📱 ${user.phone || 'No phone'}`);
      console.log(`   🎫 ${user.membershipNumber || 'No membership #'}`);
      console.log('');
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
    console.log('✅ Connection closed');
  }
}

updateMemberDetails();
