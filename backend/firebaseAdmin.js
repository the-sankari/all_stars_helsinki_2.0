const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // Or use serviceAccount
  });
}

module.exports = admin;
