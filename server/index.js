const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const RegisterModel = require('./models/Register')

const app = express()
app.use(cors(
    {
        origin: ["http://localhost:5173"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.use(express.json())

mongoose.connect('mongodb+srv://samiran:Swami$0107@cluster0.rnlynt8.mongodb.net/test?retryWrites=true&w=majority').
then(()=>{console.log("succes connection")}).catch((err)=>{console.log(err)});


app.get("/", (req, res) => {
    res.json("Hello");
})
app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    RegisterModel.findOne({email: email})
    .then(user => {
        if(user) {
            res.json("Already have an account")
        } else {
            RegisterModel.create({name: name, email: email, password: password})
            .then(result => res.json(result))
            .catch(err => res.json(err))
        }
    }).catch(err => res.json(err))
})
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Find the user in the database
    RegisterModel.findOne({ email: email, password: password })
        .then(user => {
            if (user) {
                // Authentication successful
                res.json("Login successful");
            } else {
                // User not found or password incorrect
                res.status(401).json("Invalid credentials");
            }
        })
        .catch(err => res.status(500).json(err));
});

app.listen(3001, () => {
    console.log("Server is Running")
})