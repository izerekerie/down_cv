// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = 5000; // You can choose any available port

app.use(cors());

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
