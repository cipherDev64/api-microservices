const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 5024;

app.use(cors());
app.use(express.json());

/*
    Mongo DB Connection
*/

mongoose.connect("mongodb://localhost:27017/exp2")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log("MongoDB connection error", error);
    });

/*
    User Schema & Model
*/

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

/*
    Routes
*/

// GET all users
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
});

// GET user by ID
app.get('users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user)
            return res.status(404).json({ message: 'User Not Found' });

        res.json(user);
    } catch (error) {
        res.status(400).json({ message: 'Invalid ID' });
    }
});

//CREATE user
app.post('/users', async (req, res) => {
    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

//UPDATE user
app.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                email: req.body.email
            },
            { new: true, runValidators: true }
        );

        if (!updatedUser)
            return res.status(404).json({ message: 'User Not Found' });

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
});
