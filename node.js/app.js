const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const PORT = 8001;

// Middleware
app.use(bodyParser.json());

// Conectar a la base de datos
const db = new sqlite3.Database('students.sqlite', (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
    }
});

// Rutas de la API

// Obtener todos los estudiantes
app.get('/students', (req, res) => {
    const sql = "SELECT * FROM students";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// Crear un nuevo estudiante
app.post('/students', (req, res) => {
    const { firstname, lastname, gender, age } = req.body;
    const sql = `INSERT INTO students (firstname, lastname, gender, age) VALUES (?, ?, ?, ?)`;
    db.run(sql, [firstname, lastname, gender, age], function(err) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": { id: this.lastID, firstname, lastname, gender, age }
        });
    });
});

// Obtener un estudiante por ID
app.get('/student/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM students WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": row
        });
    });
});

// Actualizar un estudiante por ID
app.put('/student/:id', (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, gender, age } = req.body;
    const sql = `UPDATE students SET firstname = ?, lastname = ?, gender = ?, age = ? WHERE id = ?`;
    db.run(sql, [firstname, lastname, gender, age, id], function(err) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": { id, firstname, lastname, gender, age }
        });
    });
});

// Eliminar un estudiante por ID
app.delete('/student/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM students WHERE id = ?`;
    db.run(sql, [id], function(err) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": `Estudiante con ID: ${id} eliminado`
        });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

