const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());
const port = 5001;
const secretKey = "secretKey";

const User = {
    id: 1,
    username: "admin",
    password: "1234"
};

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === User.username && password === User.password) {
        const token = jwt.sign({ username: User.username }, secretKey, { expiresIn: '1h' });
        res.json({ message: "Login successful", token: token });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

function authenticateToken(req, res, next) {
    const token = req.headers['authentication'];
    if (!token) {
        return res.status(401).json({ message: "Token is required" });
    }
    jwt.verify(token, secretKey, (err, decode) => {
        if (err) {
            return res.status(401).send("Invalid token");
        }
        req.user = decode;
        next();
    });
}

app.get("/profile", authenticateToken, (req, res) => {
    res.json({
        message: "Welcome to secured rate",
        user: req.user
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
