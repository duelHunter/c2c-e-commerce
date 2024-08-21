const admin = require("firebase-admin");

const serviceAccount = require("../secrets/market-pulse-2b2d3-firebase-adminsdk-3cndv-9f604188b6.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


module.exports = admin;
