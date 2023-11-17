const express = require("express");
const cookies = require('cookie-parser');
const cors = require("cors");
const app = express();
require('dotenv').config();
const port = process.env.PORT;
        
app.use(express.json(), express.urlencoded({ extended: true }), cookies(), cors({credentials: true, origin: "http://localhost:3000"}));
    
require("./config/mongoose.config");

const AllMyUserRoutes = require("./routes/users.routes");
AllMyUserRoutes(app);
    
app.listen(port, () => console.log(`Listening on port: ${port}`) );
