const db = require('../config/connection');
const { Tech, Profile } = require('../models');

const techData = require('./techData.json');
const userSeeds = require('./userSeeds.json');


db.once('open', async () => {
  try {

    await Tech.deleteMany({});
    await Tech.insertMany(techData);
    console.log('Technologies seeded!');

    await Profile.deleteMany({});
    await Profile.create(userSeeds);
    console.log('Profiles seeded!');

    process.exit(0);
  } catch (error) {
    throw error
  }
});
