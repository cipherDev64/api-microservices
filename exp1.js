const express = require("express");
const app = express();
app.use(express.json());
let students = [
    { id: 1, name: "Atulya" },
    { id: 2, name: "Aniketh" },
];

//GET route - Fetch all students
app.get("/students", (req, res) => {
    res.json(students);
});

//POST route - Add a new student
app.post('/students', (req, res) => {
    const newStudent = {
        "id": students.length + 1,
        "name": req.body.name,
    };

    students.push(newStudent)
    res.status(201).json(newStudent);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

//PUT route - Update a student
app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(student => student.id === id);
    if (student) {
        student.name = req.body.name;
        res.json(student);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

//DELETE route - Delete a student
app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(student => student.id === id);
    if (student) {
        students = students.filter(student => student.id !== id);
        res.json(student);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

