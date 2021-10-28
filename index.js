const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./db/config');
const cors = require('cors');
const app = express();

//cors configuratio
app.use(cors());
//lectura y parseo del body
app.use(express.json());
//bd
dbConnection();


//rutas

app.use('/api/usuarios', require('./routes/usuarios'));

app.use('/api/login', require('./routes/auth'));

app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/uploads', require('./routes/uploads'));

app.use('/api/medicos', require('./routes/medicos'));
//L7MBPzs8cJX4JE5
// app.get('/api/usuarios',(req, res) => {
// //estados del http --> res.status(400).
//     res.json({
//         ok: true,
//         usuarios: [{
//             id:134,
//             name: '3424254'
//         }]
//     })
// });

app.listen(process.env.PORT, ()=> {
    console.log('Servidor Corrriendo');
})