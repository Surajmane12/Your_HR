// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const corsOptions = require('./middleware/corsMiddleware/corsMiddleware'); 

const app = express();


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const user_routes=require('./routes/UserRoutes/User_Routes');


app.use('/signup',user_routes);




const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
