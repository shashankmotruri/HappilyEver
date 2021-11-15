const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.set( 'port', ( process.env.PORT || 5000 ));


app.use("/api/",require('./routes/user.js'))

/*
app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

*/

app.listen(app.get( 'port' ), () => console.log(`Server started at ${app.get( 'port' )}`));

mongoose.connect(
    process.env.MONGODB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify : false
    },
    (err) => {
      if (err) throw err;
      console.log("MongoDB connection established");
    }
);