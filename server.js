const express = require('express'); 
const mongoose = require('mongoose'); 
const path = require('path');

const items = require('./routes/api/items');


const app = express(); 

//body parser middleware
app.use(express.json()); 

//DB config file 
const db = require('./config/keys').mongoURI; 

//connect to DB 
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true, 
    useUnifiedTopology: true 
})
.then(()=> console.log("MongoDB connected"))
.catch((err) => console.log("error"));


//use routes 
app.use('/api/items', items);

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
  }


const port = process.env.PORT || 5000; 
app.listen(port, () => console.log("server started"));