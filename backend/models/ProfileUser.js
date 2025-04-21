const mongoose = require('mongoose');
const profileUserSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  website: String,
  street: String,
  city: String,
  state: String,
  zip: String,
});
const ProfileUser = mongoose.model('ProfileUser', profileUserSchema);
module.exports = ProfileUser;
