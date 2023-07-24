const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const PORT = 5000; // You can choose any available port
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(cors());
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com', 
    pass: 'your_email_password', 
  },
});

app.get('/download-cv', (req, res) => {
  const cvFilePath = path.join(__dirname, 'cv', 'cv.pdf');
  const cvFileStream = fs.createReadStream(cvFilePath);

  cvFileStream.on('error', (error) => {
    console.error('Error reading CV file:', error);
    res.status(500).send('Error downloading CV');
  });
  res.setHeader('Content-disposition', 'attachment; filename=cv.pdf');
  res.setHeader('Content-type', 'application/pdf');

  cvFileStream.pipe(res);

});

app.post('/send-email', (req, res) => {
  console.log("here")
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email, // Replace with your email address
    to: 'izereuwonkundakelia@gmail.com', // Replace with the recipient's email address
    subject: 'New message from your portfolio',
    text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});