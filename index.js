//        "start": "nodemon index.js",
//cambie en package.json a lo de ariba
//npm i body-parser cors
//descarge esto para ayuda

//usados
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // import cors package
const socketIo = require('socket.io'); // Importa Socket.IO

//const cantidadLeyeron = require('./socket/catidadLeyeron');//si los separo pone lo
const AllIn = require('../models/AllIn');

const authLogin = require('./LoginPage/authLogin');
const authRegristro = require('./LoginPage/authRegristro');
const authUsuarioAkdashot = require('./InfoPage/authUsuarioAkdashot');
const authAgregarAkdashot = require('./InfoPage/authAgregarAkdashot');
const authObtieneMasBajoThogether = require('./HomePage/authObtieneMasBajoThogether');
const leyoRevisa = require('./TextPage/leyoRevisa');
const sumarThogether = require('./TextPage/sumarThogether');
const adminThogether = require('./AdminPage/adminThogether');
const adminEs = require('./AdminPage/adminEs');
const suveOneInfo = require('./InfoPage/suveOneInfo');
const authDevuelveInfoEstudia = require('./InfoPage/authDevuelveInfoEstudia');
const borrarUsuario = require('./InfoPage/borrarUsuario');
const authAllAkdashot = require('./AkdashotPage/authAllAkdashot');

const iniciaSetThogether = require('./AddHomePage/autoSetDay');

//const test = require('./jaluka/test');

const app = express();

const PORT = 8080 || 5000; //el puerto

app.use(express.json());
app.use(cors()); // use cors

iniciaSetThogether();

app.use('/', authAgregarAkdashot);
app.use('/', authLogin);
app.use('/', authRegristro);
app.use('/', authUsuarioAkdashot);
app.use('/', authAllAkdashot);
app.use('/', adminThogether);
app.use('/', authObtieneMasBajoThogether);
app.use('/', leyoRevisa);
app.use('/', sumarThogether);
app.use('/', adminEs);
app.use('/', suveOneInfo);
app.use('/', authDevuelveInfoEstudia);
app.use('/', borrarUsuario);

//app.use('/', test);

// Conectar a MongoDB
mongoose
    .connect('mongodb://127.0.0.1:27017/trabajo')
    .then(() => {
        console.log('entro mongos connect');
        // Conectarse
        const server = app.listen(PORT, () => {
            // Al conectarse
            console.log('Server is running on port ' + PORT);
            //const io = cantidadLeyeron(server);

            const io = socketIo(server);

            let lastTotalCombined = null;

            const calculateTotal = (field) => {
                if (!field) return 0;
                return Object.values(field).reduce(
                    (acc, curr) => acc + curr,
                    0
                );
            };

            const emitData = async (nuevo = false) => {
                try {
                    // Consultar MongoDB para obtener el último documento
                    const result = await AllIn?.findOne().sort({ date: -1 });
                    if (result) {
                        const totalAllSheferThogether = calculateTotal(
                            result.allSheferThogether
                        );

                        // Emitir los datos solo si ha habido un cambio o es nuevo
                        if (
                            totalAllSheferThogether !== lastTotalCombined ||
                            nuevo
                        ) {
                            const data = { count: totalAllSheferThogether };
                            // Emitir a todos los clientes conectados
                            io.emit('update', data);

                            lastTotalCombined = totalAllSheferThogether;
                        }
                    }
                } catch (err) {
                    console.error('Error al consultar MongoDB:', err);
                }
            };

            // Configurar un intervalo para emitir los datos a los clientes conectados
            setInterval(emitData, 6000);

            io.on('connection', (socket) => {
                // Emitir los datos inmediatamente cuando un cliente se conecta
                emitData(true);

                // Limpiar al desconectar, si es necesario
                /*socket.on('disconnect', () => {
            console.log('Usuario desconectado: ' + socket.id);
        });*/
            });

            return io;
        });
    })
    .catch((err) => {
        // Si hay un error
        console.log('Error al conectar a MongoDB:', err);
    });
