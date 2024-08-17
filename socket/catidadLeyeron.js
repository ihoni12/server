const socketIo = require('socket.io'); // Importa Socket.IO
const AllIn = require('../models/AllIn');

let io; // Variable para almacenar el servidor de Socket.IO

const cantidadLeyeron = (server) => {
    io = socketIo(server);

    let lastTotalCombined = null;

    const calculateTotal = (field) => {
        if (!field) return 0;
        return Object.values(field).reduce((acc, curr) => acc + curr, 0);
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
                if (totalAllSheferThogether !== lastTotalCombined || nuevo) {
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
};

module.exports = cantidadLeyeron;
