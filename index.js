//        "start": "nodemon index.js",
//cambie en package.json a lo de ariba
//npm i body-parser cors
//descarge esto para ayuda

//usados
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // import cors package

const socketIo = require('socket.io'); // Importa Socket.IO
const AllIn = require('./models/AllIn');

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

const iniciaSetThogether = require('./AddHomePage/autoSetDay');

//no usados
const authAllAkdashot = require('./AkdashotPage/authAllAkdashot');
const authDevuelvePerek = require('./HomePage/authDevuelvePerek');
const authUsuarioInfo = require('./InfoPage/authUsuarioInfo');
const authSetThogether = require('./AddHomePage/authSetThogether');
const authCualesEstudian = require('./HomePage/authCualesEstudian');
const authSumaLeyo = require('./HomePage/authSumaLeyo');
const revisaNivel = require('./Seguridad/devuelveRevisaAdmin');
const devuelveThohether = require('./AdminPage/devuelveThohether');

//const test = require('./jaluka/test');

const app = express();

const PORT = 443 || 5000; //el puerto

app.use(express.json());
app.use(cors()); // use cors

iniciaSetThogether();

app.use('/', authAgregarAkdashot);
app.use('/', authLogin);
app.use('/', authRegristro);
app.use('/', authUsuarioAkdashot);
app.use('/', authAllAkdashot);
app.use('/', authDevuelvePerek);
app.use('/', authUsuarioInfo);
app.use('/', authSetThogether);
app.use('/', authCualesEstudian);
app.use('/', authSumaLeyo);
app.use('/', revisaNivel);
app.use('/', adminThogether);
app.use('/', devuelveThohether);
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

            // Configura Socket.IO para que funcione con el servidor Express
            const io = socketIo(server);
            console.log('io');

            io.on('connection', (socket) => {
                console.log('A client has connected.'); // Imprime un mensaje en la consola cuando un cliente se conecta

                let lastTotalCombined = null;

                const calculateTotal = (field) => {
                    if (!field) return 0;
                    return Object.values(field).reduce(
                        (acc, curr) => acc + curr,
                        0
                    );
                };

                const intervalId = setInterval(async () => {
                    try {
                        // Consultar MongoDB para obtener el último documento
                        const result = await AllIn?.findOne().sort({
                            date: -1,
                        });
                        //console.log('result: ', result);
                        if (result) {
                            const totalAllSheferThogether = calculateTotal(
                                result.allSheferThogether
                            );

                            // Emitir los datos solo si ha habido un cambio
                            if (totalAllSheferThogether !== lastTotalCombined) {
                                const data = {
                                    count: totalAllSheferThogether,
                                };
                                // Emitir a todos los clientes conectados
                                io.emit('update', data);

                                lastTotalCombined = totalAllSheferThogether;
                            }
                        }
                    } catch (err) {
                        console.error('Error al consultar MongoDB:', err);
                    }
                }, 1000);

                // Limpiar el intervalo cuando el usuario se desconecta
                socket.on('disconnect', () => {
                    clearInterval(intervalId);
                    console.log('Usuario desconectado: ' + socket.id);
                });
            });
        });
    })
    .catch((err) => {
        // Si hay un error
        console.log('Error al conectar a MongoDB:', err);
    });
