// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const cron = require('node-cron');
// const nodemailer = require('nodemailer');
// const User = require('./models/user'); // Your user model
// const Schedule = require('./models/Schedule'); // Your schedule model

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// mongoose.connect('mongodb://127.0.0.1:27017/hackathon')
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error(err));

// // Setup transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'mdraza.24mca10129@vitbhopal.ac.in',
//     pass: 'oiyyrbckstcgstfy'
//   }
// });

// // CRON Job - runs every minute
// cron.schedule('* * * * *', async () => {
//   const now = new Date();
//   const currentDay = now.toLocaleString('en-IN', { weekday: 'long' }); // e.g., "Monday"
  
//   const currentTime = now.toTimeString().slice(0, 5); // HH:MM format
//   const timeBeforeClass = new Date(now.getTime() + 10 * 60000).toTimeString().slice(0, 5); // time + 10 mins

//   try {
//     const users = await User.find();
    
//     for (const user of users) {
//       const schedule = await Schedule.findOne({ stream: user.stream, slot: user.slot });

//       if (!schedule || !schedule[currentDay]) continue;

//       for (const cls of schedule[currentDay]) {
//         if (cls.time === timeBeforeClass) {
//           // Send mail
//           const mailOptions = {
//             from: 'mdraza.24mca10129@vitbhopal.ac.in',
//             to: user.email,
//             subject: `Upcoming Class Reminder - ${cls.subject}`,
//             text: `Hey ${user.name},\n\nYou have "${cls.subject}" class starting at ${cls.time}. Be ready!\n\nRegards,\nClass Scheduler Bot`
//           };

//           transporter.sendMail(mailOptions, (err, info) => {
//             if (err) {
//               console.error(`Error sending mail to ${user.email}:`, err);
//             } else {
//               console.log(`Reminder sent to ${user.email}: ${info.response}`);
//             }
//           });
//         }
//       }
//     }
//   } catch (error) {
//     console.error('CRON error:', error);
//   }
// });

// // Routes
// const userRoutes = require('./routes/userRoutes');
// app.use('/api/users', userRoutes);

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const mailRoutes = require('./routes/mailRoutes');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hackathon')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// API routes
app.use('/api/users', userRoutes);
app.use('/api/mail', mailRoutes);

// Schedule email checks
const schedule = require('node-schedule');
schedule.scheduleJob('* * * * *', async () => {
  try {
    const response = await fetch('http://localhost:5000/api/mail/send-notifications');
    const data = await response.json();
    console.log('Scheduled job:', data.message);
  } catch (err) {
    console.error('Scheduled job error:', err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});