const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
require('dotenv').config();
const userRoutes = require('./routes/Users');
const cors = require('cors');
const admin = require('firebase-admin');
const itemRoutes = require('./routes/items');
const Item = require('./models/Item');
const marchesRouter = require('./routes/marches');
const listAllFirebaseUsers = require('./utils/firebaseUsers');
const app = express();
const serviceAccount = require("./tingo-c693f-firebase-adminsdk-bvz54-c8b8525fe6.json");
const nodemailer = require('nodemailer');
const adsRouter = require('./routes/ads');
const bodyParser = require('body-parser');
const postersRouter = require('./routes/posters');
const brand = require("./models/brands");
const ProfileUser = require("./models/ProfileUser");
const Help = require('./models/Help');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
// #region Middleware For Route
app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);
app.use('/items', itemRoutes);
app.use('/api', marchesRouter);
app.use('/api/ads', adsRouter);
app.use('/api/posters', postersRouter);
app.use(bodyParser.json());
// #endregion


// #region Nassar

const orderSchema = new mongoose.Schema({

  userName: String,
  items: [{ id: String, name: String, price: Number, quantity: Number }],
  total: Number
});
const Order = mongoose.model('Order', orderSchema);

app.post('/orders', async (req, res) => {
  try {
    const { userName, items, total } = req.body;
    await Order.create({ userName, items, total });
    res.status(201).json({ message: 'Order saved successfully' });
  } catch (error) {
    console.error('Failed to save order:', error);
    res.status(500).json({ message: 'Failed to save order' });
  }
});
app.get('/ordersadmin', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});






const transporter = nodemailer.createTransport({
  service: 'gmail',
  
  auth: {
    user: '0tingopro0@gmail.com',
    pass: 'xioj sduj sjbc zbzz',
  }
});

app.post('/help', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newMessage = new Help({
      name,
      email,
      subject,
      message,
    });

    await newMessage.save();

    let mailOptions = {
      from: email,
      to: '0tingopro0@gmail.com',
      subject: "New Contact Message from Your Website",
      text: `You have received a new message from ${name} (${email}):\nSubject: ${subject}\nMessage: ${message}`,
      html: `<b>You have received a new message from ${name} (${email}):</b><br><b>Subject:</b> ${subject}<br><b>Message:</b> ${message}`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      res.status(201).json({ message: "Message received and email sent successfully" });
    } catch (error) {
      console.error('Full error stack:', error);
      res.status(500).json({ message: "Email could not be sent. Error: " + error.toString() });
    }

    console.log("Contact message saved:", newMessage);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});








// #endregion
// #region AhmadBaker
//https://www.youtube.com/watch?v=zCgruoRUxlk //React Router: useParams React Router: useNavigate
//https://www.youtube.com/watch?v=mS48F0swwAY&list=PLnHJACx3NwAdSOK3BoQ7wjCDT1Iw7hs_u //Axios
//https://www.youtube.com/watch?v=4pO-HcG2igk //State Hook
//https://getbootstrap.com/docs/4.0/components/card/
//https://getbootstrap.com/docs/4.0/components/buttons/
//https://www.youtube.com/watch?v=2ojkb44XObc
//https://www.youtube.com/watch?v=urg-a6i0HEc
//https://www.youtube.com/watch?v=f1O6b5oCWvE&list=PLT5Jhb7lgSBNdMMo5cbZUj1rESCzeoU0d
//https://www.w3schools.com/bootstrap/
//https://www.youtube.com/watch?v=3l8Lob4ysI0
//https://www.youtube.com/watch?v=yfpoT0YKSIc&t=1948s
//https://www.youtube.com/watch?v=P8YuWEkTeuE&t=3597s
//https://www.youtube.com/watch?v=054qYbsxyXw
//home
app.post('/marches', async (req, res) => {
  try {
    const newMarch = new March({
      name: req.body.name,
      photoUrl: req.body.photoUrl
    });
    const savedMarch = await newMarch.save();
    res.status(201).json(savedMarch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.get('/items/brand/:brandName', async (req, res) => {
  const { brandName } = req.params;
  try {
    const items = await Item.find({ brand: brandName }).exec();
    if (items.length > 0) {
      res.status(200).json(items);
    } else {
      res.status(404).send('No items found');
    }
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Server error');
  }
});
//home
// #endregion
// #region SaifDwekat
// https://firebase.google.com/docs/admin/setup
// https://hatchjs.com/get-all-users-from-firebase-authentication/
// https://youtu.be/Oe421EPjeBE?si=B_l98BoLC8RlT1cU 
// https://www.youtube.com/watch?v=0Hu27PoloYw 
// https://www.youtube.com/watch?v=lY6icfhap2o
// https://www.youtube.com/watch?v=SccSCuHhOw0
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction#Middleware
// https://stackoverflow.com/questions/11321635/nodejs-express-what-is-app-use
// https://www.youtube.com/watch?v=c2M-rlkkT5o
// saif users page
app.get('/firebase-users', async (req, res) => {
  try {
    const users = await listAllFirebaseUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post('/add-user', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await admin.auth().createUser({
      email,
      emailVerified: false,
      password,
      disabled: false
    });
    res.status(201).json(userRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post('/disable-user', async (req, res) => {
  const { uid } = req.body;
  try {
    const userRecord = await admin.auth().updateUser(uid, {
      disabled: true
    });
    res.status(200).json(userRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.delete('/delete-user', async (req, res) => {
  const { uid } = req.body;
  try {
    await admin.auth().deleteUser(uid);
    res.status(200).send('User deleted successfully');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post('/enable-user', async (req, res) => {
  const { uid } = req.body;
  try {
    const userRecord = await admin.auth().updateUser(uid, {
      disabled: false
    });
    res.status(200).json(userRecord);
  } catch (error) {
    console.error('Error enabling user:', error);
    res.status(500).json({ message: error.message });
  }
});
// saif users page

//to add and remove admins 
app.post('/add-admin', async (req, res) => {
  const { uid } = req.body;
  try {
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    res.status(200).send(`Admin privileges added to user ${uid}`);
  } catch (error) {
    res.status(500).send(`Error adding admin privileges: ${error.message}`);
  }
});
app.post('/remove-admin', async (req, res) => {
  const { uid } = req.body;
  try {
    await admin.auth().setCustomUserClaims(uid, { admin: null });
    res.status(200).send(`Admin privileges removed from user ${uid}`);
  } catch (error) {
    res.status(500).send(`Error removing admin privileges: ${error.message}`);
  }
});
app.get('/firebase-users', async (req, res) => {
  try {
    const listUsersResult = await admin.auth().listUsers();
    const users = await Promise.all(listUsersResult.users.map(async (userRecord) => {
      const customClaims = (await admin.auth().getUser(userRecord.uid)).customClaims || {};
      return {
        uid: userRecord.uid,
        email: userRecord.email,
        disabled: userRecord.disabled,
        customClaims: customClaims
      };
    }));
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(`Error fetching users: ${error.message}`);
  }
});
//total users endpoint
app.get('/api/totalUsers', async (req, res) => {
  try {
    const userRecords = await admin.auth().listUsers();
    res.json({ totalUsers: userRecords.users.length });
  } catch (error) {
    console.error('Failed to fetch total users', error);
    res.status(500).json({ error: 'Failed to fetch total users' });
  }
});
//total users endpoint

//This is from nodemailer
app.post('/send-email', async (req, res) => {
  const { email, userName, items, total } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'saifdwekat350@gmail.com',
      pass: 'baye ipej aedc rgfg'
    }
  });
  const generateEmailTemplate = (items, total) => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <img src="https://i.ibb.co/z6TnL5H/tingol.png" alt="Your Logo" style="display: block; margin: 0 auto; max-width: 100%;" />
        <h2>Order Confirmation</h2>
        <p>Hello ${userName},</p>
        <p>Thank you for your order! Here are the details of your purchase:</p>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="border-bottom: 1px solid #ddd; padding: 8px;">Item</th>
              <th style="border-bottom: 1px solid #ddd; padding: 8px;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${items.map(item => `
              <tr>
                <td style="border-bottom: 1px solid #ddd; padding: 8px;">${item.name}</td>
                <td style="border-bottom: 1px solid #ddd; padding: 8px;">$${item.price}</td>
                <td style="border-bottom: 1px solid #ddd; padding: 8px;">
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <p>Total: <strong>$${total}</strong></p>
        <p>Thank you for shopping with us!</p>
      </div>
    `;
  };
  const mailOptions = {
    from: 'Tingo Team',
    to: email,
    subject: 'Order Confirmation',
    html: generateEmailTemplate(items, total)
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});
// mongocont
app.get('/collections', async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.json(collections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get('/collections/:name', async (req, res) => {
  try {
    const collectionName = req.params.name;
    const documents = await mongoose.connection.db.collection(collectionName).find({}).toArray();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.put('/collections/:name/:id', async (req, res) => {
  try {
    const collectionName = req.params.name;
    const documentId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(documentId)) {
      return res.status(400).json({ message: 'Invalid document ID' });
    }
    console.log('Updating document in collection:', collectionName);
    console.log('Document ID:', documentId);
    console.log('Update data:', req.body);
    const { _id, ...updateData } = req.body;
    const updateResult = await mongoose.connection.db.collection(collectionName).updateOne(
      { _id: new mongoose.Types.ObjectId(documentId) },
      { $set: updateData }
    );
    console.log('Update result:', updateResult);
    // after update 
    res.json(updateResult);
  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).json({ message: error.message });
  }
});
// mongocont
// #endregion
// #region Menna
// https://youtu.be/O6P86uwfdR0?si=0k06ix4ZDn2DZ9Bm
// https://www.js-tutorials.com/react-js/react-hooks-tutorial-usestate-and-useeffect/
// https://www.youtube.com/watch?v=zb3Qk8SG5Ms&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU
// https://www.youtube.com/watch?v=w3vs4a03y3I
// https://www.youtube.com/watch?v=p3F0IqMQQpg
// https://www.youtube.com/watch?v=XBu54nfzxAQ&t=14s
//itemsdetails
app.get('/items/:itemId', async (req, res) => {
  const { itemId } = req.params;
  console.log('Received request for item ID:', itemId);

  try {
    const item = await Item.findById(itemId);
    console.log('result for item:', item);

    if (!item) {
      console.log('No item found for ID:', itemId);
      return res.status(404).send({ message: 'Item not found' });
    }

    res.status(200).json(item);
  } catch (error) {
    console.log('Error retrieving item:', error);
    res.status(500).send({ message: 'Error retrieving item', error: error.message });
  }
});
app.post('/cart/add', async (req, res) => {
  const { userId, itemId, name, price } = req.body;
  try {
    const newCartItem = new Cart({ userId, itemId, name, price });
    await newCartItem.save();
    res.status(201).send('Item added to cart');
  } catch (error) {
    res.status(500).send('Error adding item to cart');
  }
});
//M-CART
const cartSchema = new mongoose.Schema({
  userId: String,
  itemId: String,
  name: String,
  price: Number,
  addedAt: { type: Date, default: Date.now }
});
const Cart = mongoose.model('Cart', cartSchema);
//M-CART
//itemsdetails
// #endregion
// #region Nosyba
const commentSchema = new mongoose.Schema({
  _id: String, 
  itemId: String,
  text: String,
  user: String,
  createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);

app.post('/log-comments', async (req, res) => {
  try {
      const comments = req.body;
      await Comment.insertMany(comments);
      res.status(200).send('saved successfully');
  } catch (error) {
      console.error('Failed log:', error);
      res.status(500).send('Failed');
  }
});
// #endregion
// #region AhmadIR
// Links 
// https://www.youtube.com/watch?v=phWxA89Dy94&t=197s 
// https://getbootstrap.com/docs/5.3/utilities/flex/
// https://getbootstrap.com/docs/5.0/layout/grid/
// https://www.youtube.com/watch?v=i7uJAOFEd4g
// https://www.youtube.com/watch?v=DURM6yft8RU
// https://www.youtube.com/watch?v=LG7ff9TVWjM


app.post("/saveBrands", async (req, res) => {
  try {
    const {
      name,
      photoUrl,
      pricePerDay,
      pricePerWeek,
      pricePerMonth,
      category,
    } = req.body;
    const newBrand = new brand({
      name,
      photoUrl,
      pricePerDay,
      pricePerWeek,
      pricePerMonth,
      category,
    });
    await newBrand.save();
    res.json(newBrand);
  } catch (error) {
    console.error("Error while saving the brand:", error);
    res.status(500).send("<h1>Error saving brand</h1>");
  }
});

app.get("/saveBrands", async (req, res) => {
  try {
    const filterParams = req.query;
    console.log(filterParams);
    const query = {};
    const sortObj = {};
    if (filterParams.sortBy) {
      switch (filterParams.sortBy) {
        case "1": 
          sortObj.pricePerDay = 1;
          sortObj.pricePerMonth = 1;
          sortObj.pricePerWeek = 1;
          break;
        case "2": 
          sortObj.pricePerDay = -1;
          sortObj.pricePerMonth = -1;
          sortObj.pricePerWeek = -1;
          break;
        default:
          break;
      }
    }

    if (filterParams.brands) {
      query.name = { $in: filterParams.brands.split(",") };
    }

    const getBrands = await brand.find(query).sort(sortObj);

    res.json(getBrands);
  } catch (error) {
    console.error("Error while getting the brand:", error);
    res.status(500).send("<h1>Error getting brand</h1>");
  }
});
// #endregion
// #region Omar
// #endregion
// #region Rahaf
app.post('/api/updateProfile', async (req, res) => {
  const { email, ...profileData } = req.body;
  try {
    await ProfileUser.findOneAndUpdate({ email }, profileData, { upsert: true });
    res.status(200).send('successfully');
  } catch (error) {
    console.error('Error', error);
    res.status(500).send('Failed');
  }
});
app.get('/api/getProfile', async (req, res) => {
  const { email } = req.query;
  try {
    const profileUser = await ProfileUser.findOne({ email });
    res.status(200).json(profileUser);
  } catch (error) {
    console.error('Error', error);
    res.status(500).send('Failed');
  }
});
// #endregion
//#region Mongoose Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => console.error("Mongo connection error:", error.message));
// #endregion
