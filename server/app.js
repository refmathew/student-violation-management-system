const express = require('express');
const app = express();
const studentRoutes = require('./routes/student');

app.use(express.json())
app.use('/api/student', studentRoutes);

const port = process.env.PORT || 4321;
app.listen(port, () => {
  console.log(`Server listening to port ${port}`)
})
