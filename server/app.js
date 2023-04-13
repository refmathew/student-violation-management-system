const express = require('express');
const app = express();
const cors = require('cors');
const studentRoutes = require('./routes/student');

app.use(express.json());
app.use(cors());
app.use('/api/student', studentRoutes);

const port = process.env.PORT || 4321;
app.listen(port, () => {
  console.log(`Server listening to port ${port}`)
})
