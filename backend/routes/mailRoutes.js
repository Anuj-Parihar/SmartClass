const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Course = require('../models/course');
const nodemailer = require('nodemailer');

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

// Check and send emails
router.get('/send-notifications', async (req, res) => {
  try {
    const now = new Date();
    const currentDay = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][now.getDay()];
    const currentHours = now.getHours().toString().padStart(2, '0');
    const currentMinutes = now.getMinutes().toString().padStart(2, '0');
    const currentTime = `${currentHours}:${currentMinutes}`;

    // Get all courses
    const courses = await Course.find();
    
    let emailsSent = 0;

    for (const course of courses) {
      // Check if today is in course days
      if (course.days.includes(currentDay)) {
        const todaysClasses = course.schedule.get(currentDay) || [];
        
        // Find classes happening now
        const currentClasses = todaysClasses.filter(cls => cls.time === currentTime);
        
        if (currentClasses.length > 0) {
          // Get all users in this program and slot
          const users = await User.find({
            stream: course.program,
            slot: course.slot
          });
          
          // Send email to each user
          for (const user of users) {
            for (const classInfo of currentClasses) {
              const mailOptions = {
                from: '"Smart Class System" <notifications@smartclass.com>',
                to: user.email,
                subject: 'Class Reminder',
                html: `
                  <h2>Class Reminder</h2>
                  <p><strong>Program:</strong> ${course.program}</p>
                  <p><strong>Slot:</strong> ${course.slot}</p>
                  <p><strong>Day:</strong> ${currentDay}</p>
                  <p><strong>Time:</strong> ${classInfo.time}</p>
                  <p><strong>Subject:</strong> ${classInfo.subject}</p>
                  <p>Please join your class on time.</p>
                `
              };
              
              await transporter.sendMail(mailOptions);
              emailsSent++;
            }
          }
        }
      }
    }
    
    res.json({ 
      success: true,
      message: `Notifications sent successfully. ${emailsSent} emails sent.`
    });
  } catch (err) {
    console.error('Error sending notifications:', err);
    res.status(500).json({ 
      success: false,
      message: 'Error sending notifications'
    });
  }
});

// Get mailing status
router.get('/status', (req, res) => {
  res.json({ 
    status: 'active',
    message: 'Emailing is ongoing according to the class time.'
  });
});

module.exports = router;