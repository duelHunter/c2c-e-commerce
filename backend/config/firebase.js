const admin = require("firebase-admin");

const serviceAccount = require("../secrets/market-pulse-2b2d3-firebase-adminsdk-3cndv-e3d10c60b5.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


module.exports = admin;
