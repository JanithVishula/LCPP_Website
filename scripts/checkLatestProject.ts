import { MongoClient } from 'mongodb';

async function checkLatestProject() {
  const client = new MongoClient('mongodb://localhost:27017');
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db('leo_club');
    const projects = await db.collection('projects').find().sort({ createdAt: -1 }).limit(1).toArray();
    
    console.log('\n📋 Latest Project in Database:');
    console.log('=====================================');
    
    if (projects.length === 0) {
      console.log('No projects found in database');
    } else {
      const project = projects[0];
      console.log(`Title: ${project.title}`);
      console.log(`Description: ${project.description}`);
      console.log(`Year: ${project.year}`);
      console.log(`Category: ${project.category}`);
      console.log(`Created: ${project.createdAt}`);
      console.log(`\nFull Project Data:`);
      console.log(JSON.stringify(project, null, 2));
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

checkLatestProject();
