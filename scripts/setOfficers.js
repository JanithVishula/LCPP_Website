const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'leo_club';

// Officer names/emails to search for
const officerIdentifiers = [
  'onel',
  'lithira',
  'winnath',
  'hasindu',
  'matheesha',
  'bhagya',
  'sandinu',
  'saviru'
];

async function setOfficers() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB\n');

    const db = client.db(dbName);
    const usersCollection = db.collection('users');

    // Find and update officers
    let foundOfficers = [];
    
    for (const identifier of officerIdentifiers) {
      const user = await usersCollection.findOne({
        $or: [
          { name: new RegExp(identifier, 'i') },
          { email: new RegExp(identifier, 'i') }
        ]
      });

      if (user) {
        await usersCollection.updateOne(
          { _id: user._id },
          { $set: { role: 'officer' } }
        );
        foundOfficers.push(user);
        console.log(`👮 Set as OFFICER: ${user.name} (${user.email})`);
      } else {
        console.log(`⚠️  NOT FOUND: ${identifier}`);
      }
    }

    console.log(`\n✅ Updated ${foundOfficers.length} users to officer role\n`);

    // Display final roster
    const allUsers = await usersCollection.find({}).toArray();
    
    console.log('📊 Final user roles:\n');
    
    const admin = allUsers.filter(u => u.role === 'admin');
    const officers = allUsers.filter(u => u.role === 'officer');
    const members = allUsers.filter(u => u.role === 'member');

    console.log('👑 ADMIN (1):');
    admin.forEach(u => console.log(`  - ${u.name} (${u.email})`));
    
    console.log('\n👮 OFFICERS (8):');
    officers.forEach(u => console.log(`  - ${u.name} (${u.email})`));
    
    console.log(`\n👤 MEMBERS (${members.length}):`);
    members.slice(0, 5).forEach(u => console.log(`  - ${u.name} (${u.email})`));
    if (members.length > 5) {
      console.log(`  ... and ${members.length - 5} more members`);
    }

    console.log(`\n📈 TOTAL USERS: ${allUsers.length}`);
    console.log(`   - Admins: ${admin.length}`);
    console.log(`   - Officers: ${officers.length}`);
    console.log(`   - Members: ${members.length}`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
    console.log('\n✅ Connection closed');
  }
}

setOfficers();
