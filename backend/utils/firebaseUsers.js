const admin = require('firebase-admin');
async function listAllFirebaseUsers(nextPageToken) {
  try {
    const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
    const users = listUsersResult.users.map(userRecord => userRecord.toJSON());
    if (listUsersResult.pageToken) {
      return users.concat(await listAllFirebaseUsers(listUsersResult.pageToken));
    }
    return users;
  } catch (error) {
    console.error('Failed to list users:', error);
    throw error;
  }
}
module.exports = listAllFirebaseUsers;
//for usres page (admin)
// https://firebase.google.com/docs/admin/setup