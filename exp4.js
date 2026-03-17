const express = require("express");
const cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Express API with Swagger",
        version: "1.0.0",
        description: "A simple Express API with Swagger",
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Development Server",
        },
    ],
};

const options = {
    swaggerDefinition, apis: ["exp4.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const students = [
    {
        name: "Atulya Manikandan",
        college: "New Horizon College of Engineering",
    },
    {
        name: "Arangan Shankar",
        college: "New Horizon College of Engineering",
    },
];

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Testing endpoint
 *     description: For testing the endpoint
 *     responses:
 *       200:
 *         description: API is working!
 */

app.get("/", (req, res) => {
    res.send("API is Working!");
});

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get all students
 *     description: Returns a list of students
 *     responses:
 *       200:
 *         description: A list of students
 */

app.get("/students", (req, res) => {
    res.json(students);
});

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Add a new student
 *     description: Adds a new student to the list
 *     responses:
 *       200:
 *         description: Student added successfully
 */

app.post("/students", (req, res) => {
    const newStudent = {
        name: req.body.name,
        college: req.body.college,
    };
    students.push(newStudent);
    res.json(newStudent);
});

/**
 * @swagger
 * /students/{name}:
 *   delete:
 *     summary: Delete a student
 *     description: Deletes a student from the list by name
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Name of the student to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 */

app.delete("/students/:name", (req, res) => {
    const nameToSearch = req.params.name;
    const index = students.findIndex((s) => s.name === nameToSearch);

    if (index !== -1) {
        const deletedStudent = students.splice(index, 1);
        res.json({
            message: "Student deleted successfully",
            student: deletedStudent[0]
        });
    } else {
        res.status(404).json({ message: "Student not found" });
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
