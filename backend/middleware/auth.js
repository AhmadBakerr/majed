const admin = require('firebase-admin');

const authMiddleware = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    const idToken = req.headers.authorization.split('Bearer ')[1];
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = decodedToken;
      req.isAuth = true;
      next();
    } catch (error) {
      console.error('Error verifying auth token', error);
      req.isAuth = false;
      res.status(403).send('Unauthorized');
    }
  } else {
    req.isAuth = false;
    res.status(403).send('Unauthorized');
  }
};

module.exports = authMiddleware;
