const admin = require('firebase-admin');
const serviceAccount = require('./tingo-c693f-firebase-adminsdk-bvz54-c8b8525fe6.json');  
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const setAdminClaim = (uid) => {
  admin.auth().setCustomUserClaims(uid, { admin: true })
    .then(() => {
      console.log(`Success! User ${uid} has been made an admin.`);
    })
    .catch((error) => {
      console.error('Error setting custom claims:', error);
    });
};

const uid = "oIobFszOdSQqjZpAUPhBs7u9f753";  
setAdminClaim(uid);
// https://firebase.google.com/docs/admin/setup