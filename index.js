const express = require('express');
const { resolve } = require('path');
const mongoose = require('mongoose');
const blogRoutes = require('./blogRoutes');

const app = express();
const port = 3010;

mongoose.connect('mongodb://localhost:27017/blogApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 50000,  // 50 seconds timeout
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.error('MongoDB connection error:', error));


app.use(express.json());


app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.use('/api', blogRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
