// Manual import script - directly create members from CSV data
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/leo_club';

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function importRealMembers() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB\n');

    const db = client.db('leo_club');
    const users = db.collection('users');

    const hashedPassword = await hashPassword('Leo@2026');

    // Real member data from the CSV
    const members = [
      // First member = Admin
      { name: 'Wibhavith Bandara', email: 'leo.thavishab@gmail.com', phone: '94771856959', city: 'Pannipitiya', memberID: '5728443', role: 'admin' },
      // Next 2 = Officers
      { name: 'Gimhani Wkickramarathna', email: 'gimhaniwickramarathna882@gmail.com', phone: '94-76-8375631', city: 'Piliyandala', memberID: '5986850', role: 'officer' },
      { name: 'Nawimana Withanage Ramuditha', email: 'nwlramuditha22612@gmail.com', phone: '94703587634', city: 'Wellampitiya', memberID: '6005000', role: 'officer' },
      // Rest = Members
      { name: 'Tharukshan Sivakumar', email: 'tharukshan9818@gmail.com', phone: '94-76-1660223', city: 'Bandarawela', memberID: '6043900', role: 'member' },
      { name: 'Banula Silva', email: 'banulayasirusilva@gmail.com', phone: '94-76-9825873', city: 'Panadura', memberID: '6242129', role: 'member' },
      { name: 'Siyath Pasqual', email: 'siyathvinthaka@gmail.com', phone: '94-94-761137537', city: 'Homagama', memberID: '6242303', role: 'member' },
      { name: 'Bhagya Supun Herath', email: 'bhagyasupunboy@gmail.com', phone: '94-94-712586007', city: 'Maho', memberID: '6242304', role: 'member' },
      { name: 'Chethiya Peiris', email: 'chethiyahasanpieris12345678@gmail.com', phone: '94-77-5974948', city: 'Galagedera', memberID: '6243187', role: 'member' },
      { name: 'Menura Wijesiri', email: 'menuramanthila2003@gmail.com', phone: '94-77-78958841', city: 'Kolonnawa', memberID: '6243194', role: 'member' },
      { name: 'Kawya Sathsara', email: 'kawyasathsara8@gmail.com', phone: '94-70-4048429', city: 'Kadawatha', memberID: '6243199', role: 'member' },
      { name: 'Yasmini Rajapaksha', email: 'rajapakshayranjana@gmail.com', phone: '94-70-2226331', city: 'Warakapola', memberID: '6244563', role: 'member' },
      { name: 'Geshini Langappulli', email: 'geshinihl@gmail.com', phone: '94-71-9028836', city: 'Alawathugoda', memberID: '6244568', role: 'member' },
      { name: 'Thisul De Silva', email: 'thisuldesilva2003@gmail.com', phone: '94-76-5541658', city: 'Malabe', memberID: '6244987', role: 'member' },
      { name: 'Venul Hearth', email: 'venulyonath2004@gmail.com', phone: '94-77-9422053', city: 'Pannipitiya', memberID: '6244996', role: 'member' },
      { name: 'Matheesha De Silva', email: 'matheesharavihara@gmail.com', phone: '94-77-7060237', city: 'Malabe', memberID: '6245000', role: 'member' },
      { name: 'Jeesmitha Somasiri', email: 'somasiripunsara@gmail.com', city: 'Matale', memberID: '6272910', role: 'member' },
      { name: 'Palendage Rehan Fernando', email: 'rehanfernando2518@gmail.com', city: 'Padukka', memberID: '6273472', role: 'member' },
      { name: 'Venuka Jagadakshi Ariyarathna', email: 'jagadakshimatheesha@gmail.com', city: 'Mathugama', memberID: '6273518', role: 'member' },
      { name: 'Havindu Keshan Mendis', email: 'havindumendis@gmail.com', city: 'Maharagama', memberID: '6274389', role: 'member' },
      { name: 'Thejan Jayasinghe', email: 'thejanc2006@gmail.com', city: 'Kaluthara South', memberID: '6274560', role: 'member' },
      { name: 'Nisula Hettiarachchi', email: 'clicksbynissa@gmail.com', phone: '94-77-9241985', city: 'Colombo 07', memberID: '6316402', role: 'member' },
      { name: 'Onel Herath', email: 'onelherath0918@gmail.com', phone: '94-94-0767059459', city: 'Pannipitiya', memberID: '6325481', role: 'member' },
      { name: 'Hiruna Alpitiya', email: 'hiruna.alpitiya2222@gmail.com', phone: '94-94-710816023', city: 'Kannaththota', memberID: '6330929', role: 'member' },
      { name: 'Sehan Uthpala', email: 'sehanuthpala2003@gmail.com', phone: '94-94-770630662', city: 'Wellampitiya', memberID: '6338370', role: 'member' },
      { name: 'Saviru Senevirathna', email: 'savirusenevi@icloud.com', phone: '+94779601568', city: 'Galle', memberID: '26699672', role: 'member' },
      { name: 'Vimuth Methmina', email: 'vimuthmethmina@gmail.com', phone: '0741015730', city: 'Kadawatha', memberID: '26706837', role: 'member' },
      { name: 'Uvin Kaveesh', email: 'uvinkaveesh@gmail.com', phone: '97-71-3539052', city: 'Colombo', memberID: '6000628', role: 'member' },
      { name: 'Vidusha Thevinda', email: 'vidushaambawaththa@gamil.com', phone: '0753556780', city: 'Ukuwela', memberID: '26709601', role: 'member' },
      { name: 'Dulaj Karunanayake', email: 'chandrikawijesingha@gmail.com', city: 'Athurugiriya', memberID: '26718716', role: 'member' },
      { name: 'Janith Vishula', email: 'jvishula35@gmail.com', phone: '94-70-1934703', city: 'Kegalle', memberID: '6243180', role: 'member' },
      { name: 'Manuga Herath', email: 'herathmanuga15@gmail.com', city: 'Kadawatha', memberID: '26868024', role: 'member' },
      { name: 'Asenda Handunhewa', email: 'nethadhewa@gmail.com', city: 'Matara', memberID: '26868082', role: 'member' },
      { name: 'Sandinu Nethmika', email: 'sanaboy2332@gmail.com', city: 'Ingiriya', memberID: '26868106', role: 'member' },
      { name: 'Budvin Karunathilake', email: 'budvinlaknidu@icloud.com', phone: '724949001', city: 'Kurunagala', memberID: '26867984', role: 'member' },
      { name: 'Sadila Amarasuriya', email: 'amarasuriyasadila@gmail.com', city: 'Piliyandala', memberID: '26868044', role: 'member' },
      { name: 'Oneth Perera', email: 'rankethonethx@gmail.com', city: 'Bandaragama', memberID: '26868253', role: 'member' },
      { name: 'Hasindu Induwara', email: 'induwarahasindu2022@gmail.com', city: 'Homagama', memberID: '26868200', role: 'member' },
      { name: 'Dhananjana Chandrawansha', email: 'dhananjanaanuhas@gmail.com', city: 'Homagama', memberID: '26868215', role: 'member' },
      { name: 'Savishka Weeraman', email: 'savishkaweeraman@gmail.com', city: 'walahanduwa', memberID: '26868319', role: 'member' },
      { name: 'Rusara Chandrawansha', email: 'rusarasathnidu24@gmail.com', phone: '0759651844', city: 'Polgasowita', memberID: '26903629', role: 'member' },
      { name: 'Isuru Ranasinghe', email: 'masterisururanasinghe@gmail.com', phone: '94-0-766255641', city: 'Kandy', memberID: '5777958', role: 'member' },
      { name: 'Chamodya Sithara', email: 'chamodyahansi72@gmail.com', phone: '+94 77 018 7654', city: 'Galle', memberID: '26929672', role: 'member' },
      { name: 'Sanaya Dewmini', email: 'sanayadewmini2005@gmail.com', phone: '+94701945674', city: 'Piliyandala', memberID: '26946174', role: 'member' },
      { name: 'Jimuth Ardithya', email: 'jimuthardithya004@gmail.com', phone: '+94782513477', city: 'Piliyandala', memberID: '26955545', role: 'member' },
      { name: 'Anuga Kumarajeewa', email: 'anugarasmitha2@gmail.com', phone: '0760011493', city: 'Colombo', memberID: '27138011', role: 'member' },
      { name: 'Kalhara Jayathissa', email: 'kalharajay@gmail.com', city: 'Dehiowita', memberID: '27157496', role: 'member' },
      { name: 'Indeepa Nejan', email: 'indeepanejanpro@gmail.com', city: 'Pannipitiya', memberID: '27157507', role: 'member' },
      { name: 'Mokitha Minsara', email: 'mokithaminsara@gmail.com', city: 'Malabe', memberID: '27157513', role: 'member' },
      { name: 'Upadya Perera', email: 'upadyasperera@gmail.com', city: 'Handessa', memberID: '27157539', role: 'member' },
      { name: 'Shehara Karunarathne', email: 'sheharakuni15@gmail.com', phone: '762975259', city: 'Kegalle', memberID: '27201538', role: 'member' },
      { name: 'W. A. Yasith Eranga Gunathilaka', email: 'yasitheranga66@gmail.com', city: 'Battaramulla', memberID: '27201808', role: 'member' },
      { name: 'Sadika Pathinagoda', email: 'sadikapathinagoda456@gmail.com', city: 'Kiribathgoda', memberID: '27201818', role: 'member' },
      { name: 'N.W.N. Kosala', email: 'nuwangikosala7@gmail.com', city: 'Kolonnawa', memberID: '27201802', role: 'member' },
      { name: 'Chirasthi Upeakshe Dewmina', email: 'chirasthidewmina@gmail.com', city: 'Piliyandala', memberID: '27201847', role: 'member' },
      { name: 'Hiruna Gallage', email: 'hirunaofficial@gmail.com', city: 'Wellampitiya', memberID: '27201821', role: 'member' },
      { name: 'Sithmaka Dilmith', email: 'sithmakadilmith@gmail.com', city: 'Homagama', memberID: '27201831', role: 'member' },
      { name: 'Sayuni Chithara', email: 'sayunimanawadu2004@gmail.com', city: 'Piliyandala', memberID: '27201835', role: 'member' },
      { name: 'Amitha Hettiarachchi', email: 'kaushikahettiarachchi14@gmail.com', city: 'Borella', memberID: '27201860', role: 'member' },
      { name: 'Miron Senevirathna', email: 'senevirathnamiron@gmail.com', city: 'Battaramulla', memberID: '27201866', role: 'member' },
      { name: 'Madagama gamage sithija induwara', email: 'mgsithija@gmail.com', city: 'Galle', memberID: '27201871', role: 'member' },
      { name: 'Mokitha minsara jayawardana', email: 'mokithaminsara@gmail.com', city: 'Malabe', memberID: '27201875', role: 'member' },
      { name: 'Sathish Dileepa Bandara', email: 'sathishdileepa@gmail.com', city: 'Bandaragama', memberID: '27201880', role: 'member' },
      { name: 'L.L.Indeepa Nejan', email: 'indeepanejanpro@gmail.com', city: 'Malabe', memberID: '27202036', role: 'member' },
      { name: 'Arshana Himanka', email: 'arshana12345himanka@gmail.com', city: 'Angoda', memberID: '27202045', role: 'member' },
    ];

    // Create users with full details
    const usersToInsert = members.map(member => ({
      name: member.name,
      email: member.email.toLowerCase(),
      password: hashedPassword,
      role: member.role as 'member' | 'admin' | 'officer',
      membershipNumber: `LCPP-${member.memberID}`,
      phone: member.phone,
      memberID: member.memberID,
      firstName: member.name.split(' ')[0],
      lastName: member.name.split(' ').slice(1).join(' '),
      address: {
        city: member.city,
        country: 'Sri Lanka'
      },
      joinedDate: new Date('2024-01-01'),
      active: true,
      membershipType: 'Leo [Active]',
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    // Clear and insert
    await users.deleteMany({});
    const result = await users.insertMany(usersToInsert);

    console.log(`✅ Imported ${result.insertedCount} members\n`);
    console.log('📊 Summary:');
    console.log(`- Admin: 1`);
    console.log(`- Officers: 2`);
    console.log(`- Members: ${result.insertedCount - 3}`);
    console.log(`\n🔐 Password for ALL members: Leo@2026\n`);
    console.log('Sample logins:');
    console.log('- Admin: leo.thavishab@gmail.com / Leo@2026');
    console.log('- Officer: gimhaniwickramarathna882@gmail.com / Leo@2026');
    console.log('- Member: onelherath0918@gmail.com / Leo@2026');

    await client.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

importRealMembers();