const express = require('express');
// const { resolve } = require('path');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const user= require('./schema');
dotenv.config();

const app = express();
const port = 3010;
app.use(express.json());

// app.use(express.static('static'));
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('connected to database'))
.catch((err)=>console.log('Error connecting to database', err));
// app.get('/', (req, res) => {
//   res.sendFile(resolve(__dirname, 'pages/index.html'));
// });
app.post('/api/users', async(req,res)=>{
  try {
    const userData=req.body;
    const newUser=new user(userData);
    await newUser.save();
    res.status(201).json({message:'User created succesfully'})
  } catch (error) {
    if(error.name==='ValidationError'){
      res.status(400)
      .json({message: 'Validation error', details: error.message})
    }
    else{
      res.status(500).json({message:'Server error', details: error.message})
    }
  }
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
