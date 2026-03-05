require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const Recipient = require('../lib/models/Recipient').default;
const { countries } = require('../lib/countries');

const countryNameToCodeMap = new Map(countries.map(c => [c.name, c.code]));

async function migrateRecipients() {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI not found in .env.local");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  const recipientsToUpdate = await Recipient.find({ countryCode: { $exists: false } });

  if (recipientsToUpdate.length === 0) {
    console.log("No recipients to migrate.");
    await mongoose.disconnect();
    return;
  }

  let updatedCount = 0;
  for (const recipient of recipientsToUpdate) {
    const countryCode = countryNameToCodeMap.get(recipient.country);
    if (countryCode) {
      recipient.countryCode = countryCode;
      await recipient.save();
      updatedCount++;
    }
  }

  console.log(`Migration complete. Updated ${updatedCount} recipients.`);
  await mongoose.disconnect();
}

migrateRecipients().catch(err => {
  console.error("Migration failed:", err);
  mongoose.disconnect();
});
