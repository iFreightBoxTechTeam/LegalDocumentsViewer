const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Serve the static HTML file for the frontend
app.use(express.static(path.join(__dirname, 'public')));

// Set up the email transporter with Gmail and app password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sidsolanki406@gmail.com',   // Your Gmail email
    pass: 'iyoa eyvu gtej cmqi'          // Replace with your 16-character Gmail app password
  }
});

// Route to handle email sending
app.post('/send-email', async (req, res) => {
  const { 
    ip, 
    userAgent, 
    timeSpent, 
    openingTime, 
    closingTime, 
    screenWidth, 
    screenHeight, 
    viewportWidth, 
    viewportHeight, 
    latitude, 
    longitude 
  } = req.body;

  // Define the content of the email
  const mailOptions = {
    from: 'sidsolanki406@gmail.com',
    to: 'sidsolanki406@gmail.com', // You can send to the same or another email
    subject: 'New PDF View Data Collected',
    text: `User opened the PDF with the following details:
          - IP Address: ${ip}
          - User Agent: ${userAgent}
          - Time Spent: ${timeSpent} seconds
          - Opening Time: ${openingTime}
          - Closing Time: ${closingTime}
          - Screen Width: ${screenWidth}px
          - Screen Height: ${screenHeight}px
          - Viewport Width: ${viewportWidth}px
          - Viewport Height: ${viewportHeight}px
          - Latitude: ${latitude}
          - Longitude: ${longitude}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Error sending email' });
    }
    console.log('Email sent:', info.response);
    return res.status(200).json({ message: 'Email sent successfully!' });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
