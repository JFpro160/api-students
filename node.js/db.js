const sqlite3 = require('sqlite3').verbose();

// Conectar a la base de datos
let db = new sqlite3.Database('students.sqlite', (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
    }
});

// Crear la tabla de estudiantes
const sqlQuery = `CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    gender TEXT NOT NULL,
    age TEXT
)`;

db.run(sqlQuery, (err) => {
    if (err) {
        console.error('Error al crear la tabla:', err.message);
    } else {
        console.log('Tabla "students" creada o ya existente.');
    }
});

// Cerrar la conexión con la base de datos
db.close((err) => {
    if (err) {
        console.error('Error al cerrar la base de datos:', err.message);
    } else {
        console.log('Conexión con la base de datos cerrada.');
    }
});

