// const mongoose = require('../services/mongodb');
const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const Task = require('../models/Task');



// Connect to MongoDB
// mongoose.connect('mongodb+srv://ericjuncheng10:XN1H5tS4BEnrYHRP@cluster0.0rnnn0v.mongodb.net/mongodb-todolist', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(error => console.error('Failed to connect to MongoDB:', error));

// Define the task schema
// const taskSchema = new mongoose.Schema({
//   user_id: String,
//   email: String,
//   title: String,
//   description: String,
//   date: Date,
//   priority_level: String,
//   progress_level: Number,
// });

// Create the Task model

async function generateEmailData(data) {
  const { priority_level, title, description } = data;
  const date = data.date ? new Date(data.date) : null;
  const to = data.email;
  const extractedDate = date.toISOString().split('T')[0];

  let emailDate;
  if (priority_level === '20') {
    emailDate = new Date(extractedDate);
    emailDate.setDate(emailDate.getDate() - 3);
  } else if (priority_level === '10') {
    emailDate = new Date(extractedDate);
    emailDate.setDate(emailDate.getDate() - 1);
  } else if (priority_level === '30') {
    emailDate = new Date(extractedDate);
    emailDate.setDate(emailDate.getDate() - 7);
  }

  const formattedEmailDate = emailDate.toISOString().split('T')[0];
  const message = `Hello,
    This is a reminder for the task with title "${title}" and description "${description}".
    The task is scheduled for ${extractedDate} with priority level ${priority_level}.
    Please take necessary actions accordingly.`;
  const subject = `Task Reminder - ${title}`;

  return {
    message,
    to,
    subject,
    emailDate: formattedEmailDate,
  };
}

async function sendEmail(to, subject, message) {
  // Set up the SMTP transport configuration
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Replace with your SMTP server host
    port: 587, // Replace with the SMTP server port
    secure: false, // Set to true if using SSL/TLS
    auth: {
      user: 'worldpopi57@gmail.com', // Replace with your email address
      pass: 'nvomcteiswhrbveo', // Replace with your email password
    },
  });

  // Set up the email options
  const mailOptions = {
    from: 'worldpopi57@example.com', // Sender address
    to, // Recipient address
    subject,
    text: message,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}

async function scheduleEmail() {
  try {
    const data = await Task.find().exec();

    for (const item of data) {
      const { message, to, subject, emailDate } = await generateEmailData(item);
      const currentDate = new Date().toISOString().split('T')[0];

      if (currentDate === emailDate) {
        await sendEmail(to, subject, message);
      }
    }
  } catch (error) {
    console.error('Error occurred while scheduling email:', error);
  }
}

  
  // Schedule the email job every second (for testing purposes)
  schedule.scheduleJob('*/2 * * * *', scheduleEmail);
  // schedule.scheduleJob('0 9 * * *', scheduleEmail);
  
  module.exports = {
    Task,
    scheduleEmail,
  };
