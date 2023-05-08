const express = require('express');
const app = express();
const cors = require('cors');
const studentRoutes = require('./routes/student');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

app.use(express.json());
app.use(cors());
app.use('/api/student', studentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

const port = process.env.PORT || 4321;
app.listen(port, () => {
  console.log(`Server listening to port ${port}`)
})
