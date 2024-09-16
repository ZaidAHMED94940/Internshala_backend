const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const educationRoutes = require('./Router/EducatioRoute');
const automationRoutes=require('./Router/automationRouter')
const app = express();
const PORT = process.env.PORT || 5000;
const authRoutes = require('./Router/authRoutes');
const dotenv = require('dotenv');


dotenv.config();

//Middlware

app.use(express.json({ extended: false }));
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/education', educationRoutes);
app.use('/api/automation', automationRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});