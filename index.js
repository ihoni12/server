//        "start": "nodemon index.js",
//cambie en package.json a lo de ariba
//npm i body-parser cors
//descarge esto para ayuda

//usados
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // import cors package

const cantidadLeyeron = require('./socket/catidadLeyeron');

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
const conectado = require('./HelpComponents/conectado.js');
const adminActualizaAkdashot = require('./AdminPage/adminActualizaAkdashot.js');
const adminReciveAkdasot = require('./AdminPage/adminReciveAkdasot.js');

//bidonim
const reBidon = require('./Bidon/recivirBidon.js');
const suBidon = require('./Bidon/suvirBidon.js');
const updateUno = require('./Bidon/actualisarUno.js');
const borrarUno = require('./Bidon/borrarUno.js');
const bidonUpdate = require('./Bidon/bidonUpdate.js');

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
app.use('/', conectado);
app.use('/', adminActualizaAkdashot);
app.use('/', adminReciveAkdasot);

//bidones
app.use('/', reBidon);
app.use('/', suBidon);
app.use('/', updateUno);
app.use('/', borrarUno);
app.use('/', bidonUpdate);

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
            const io = cantidadLeyeron(server);
        });
    })
    .catch((err) => {
        // Si hay un error
        console.log('Error al conectar a MongoDB:', err);
    });
