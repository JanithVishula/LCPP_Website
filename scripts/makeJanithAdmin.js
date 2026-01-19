const { MongoClient } = require('mongodb');

async function makeJanithAdmin() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('leo_club');
    const usersCollection = db.collection('users');

    // Find user with "janith" in name or email
    const janith = await usersCollection.findOne({
      $or: [
        { name: /janith/i },
        { email: /janith/i },
      ],
    });

    if (!janith) {
      console.log('❌ User with "janith" in name or email not found');
      console.log('\nAll users:');
      const allUsers = await usersCollection.find({}).toArray();
      allUsers.forEach(user => {
        console.log(`- ${user.name} (${user.email}) - Role: ${user.role}`);
      });
      return;
    }

    console.log(`Found user: ${janith.name} (${janith.email})`);

    // Update Janith to admin
    await usersCollection.updateOne(
      { _id: janith._id },
      { $set: { role: 'admin' } }
    );
    console.log('✅ Updated Janith to admin');

    // Update all other users to member (except Janith)
    const result = await usersCollection.updateMany(
      { _id: { $ne: janith._id }, role: { $ne: 'member' } },
      { $set: { role: 'member' } }
    );
    console.log(`✅ Updated ${result.modifiedCount} other users to member role`);

    console.log('\n📊 Final user roles:');
    const allUsers = await usersCollection.find({}).toArray();
    allUsers.forEach(user => {
      const icon = user.role === 'admin' ? '👑' : '👤';
      console.log(`${icon} ${user.name} (${user.email}) - ${user.role.toUpperCase()}`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

makeJanithAdmin();
