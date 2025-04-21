const admin = require('firebase-admin');
const serviceAccount = require('./tingo-c693f-firebase-adminsdk-bvz54-c8b8525fe6.json');  

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const removeAdminClaim = (uid) => {
  admin.auth().setCustomUserClaims(uid, { admin: null })
    .then(() => {
      console.log(`Success! User ${uid} admin privileges have been removed.`);
    })
    .catch((error) => {
      console.error('Error removing custom claims:', error);
    });
};

const uid = "7GF78uepo5WxQPu6iylHHZBfhsG2";  
removeAdminClaim(uid);
// https://firebase.google.com/docs/admin/setup