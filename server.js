const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// Serve the CV file as a static file
app.use('/cv', express.static(path.join(__dirname, 'cv.pdf')));

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
