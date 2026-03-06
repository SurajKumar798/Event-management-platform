require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 8000;
const bcrypt = require('bcrypt');
const userModel = require('./Models/user');
const Customer = require('./Models/customer');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;


const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send("server is ready");
})

app.post('/register', async(req, res) => {
    try{
        const { name, email, password, confirmPassword } = req.body;

        if(!name || !email || !password || !confirmPassword){
            return res.status(400).json( { error: 'fill up all the fields'})
        }
        if(password !== confirmPassword) {
            return res.status(400).json({ error: "password do not match"});
        }
        
        const existingUser = await userModel.findOne({ email });
        if(existingUser){
            return res.status(400).json({ error: "user already exists, please login."});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({name, email, password: hashedPassword});
        await newUser.save();
        res.json({ message: "user registered successfully"})
    }catch(err){
        res.status(400).json({ err})
    }
})

 app.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({error: "user not found, please register first"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({error: "invalid password"})
        }
        const token = jwt.sign({ userId: user._id, email: user.email }, SECRET_KEY, {expiresIn: '1h'})
        res.json({ message: "login successful", token, user:{
            id: user._id,
            name: user.name,
            email: user.email
        }});
    }catch(err){
        res.status(500).json({error: err.message})
    }   
 })

 app.post('/', async(req, res) => {
    try{
        const customer = new Customer(req.body);
        await customer.save();
        res.json({ message: 'customer added successfully'})
    }catch(err){
        res.status(500).json({ error: err.message})
    }
 });

 app.get('/customers', async(req, res) => {
    try{
        const customers = await Customer.find();
        res.json(customers)
    }catch(err){
        res.status(500).json({ error: err.message })
    }
 });

 app.put('/customers/:id', async(req, res) => {
    try{
        const { id } = req.params;
        await Customer.findByIdAndUpdate(id, req.body);
        res.json({ message: 'customer updated successfully'});
    }catch(err){
        res.status(500).json({ error: err.message })
    }
 })

 app.delete('/customers/:id', async(req, res) => {
    try{
       const { id } = req.params;
       await Customer.findByIdAndDelete(id);
       res.json({ message: 'customer details deleted successfully'});
    }catch(err){
        res.status(500).json({ error: err.message})
    }
 })
 
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
