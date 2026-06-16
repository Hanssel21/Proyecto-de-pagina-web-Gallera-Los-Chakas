const express = require('express');
const cors = require('cors');
const pool = require('./conexion');

const app = express();

app.use(cors());
app.use(express.json());

// LOGIN / REGISTRO
app.post('/login', async (req, res) => {

    const { nombre, usuario, password } = req.body;

    try {

        const [rows] = await pool.query(
            'SELECT * FROM usuarios WHERE usuario = ?',
            [usuario]
        );

        // SI EL USUARIO EXISTE → LOGIN
        if (rows.length > 0) {

            if (rows[0].password === password) {
                return res.json({
                    ok: true,
                    mensaje: "Bienvenido " + rows[0].nombre
                });
            }

            return res.json({
                ok: false,
                mensaje: "Contraseña incorrecta"
            });
        }

        // SI NO EXISTE → REGISTRO
        await pool.query(
            'INSERT INTO usuarios (nombre, usuario, password) VALUES (?, ?, ?)',
            [nombre, usuario, password]
        );

        return res.json({
            ok: true,
            mensaje: "Usuario registrado correctamente"
        });

    } catch (error) {
        console.error(error);
        return res.json({
            ok: false,
            mensaje: "Error en el servidor"
        });
    }
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});