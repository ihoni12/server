const cron = require('node-cron');
const valoresSheferArray = require('../HelpComponents/valoresSheferArray');
const valoresSvuyArray = require('../HelpComponents/valoresSvuyArray');
const valoresJodsiArray = require('../HelpComponents/valoresJodsiArray');
const AllJuntos = require('../models/ModelAllThogether');
const HebrewDate = require('hebrew-date');
const AllIn = require('../models/AllIn');

const iniciaCron = () => {
    cron.schedule('0 0 * * *', async () => {
        // Lógica que deseas ejecutar cada día

        // Obtén el último documento de la colección AllJuntos
        const ultimoDocumento = await AllJuntos.findOne().sort({ date: -1 });

        if (!ultimoDocumento) {
            console.error(
                'No se encontraron documentos en la colección AllJuntos.'
            );
            return;
        }
        //creo un documento de AllIn
        // en el futuro controar cada cuanto se reinicia la info que se le da al usuario, de cantidad(haora se reinicia cada dia)
        //esto solo guarda cuantos se agararon en todos juntos
        //const allInNew = new AllIn();
        //await allInNew.save();

        //creo un documento de AllJuntos
        const nuevoDocumento = new AllJuntos({
            yomi: ultimoDocumento.yomi,
            svuy: ultimoDocumento.svuy,
            shefer: ultimoDocumento.shefer,
            jodsi: ultimoDocumento.jodsi,
            allSheferThogether: {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0,
                10: 0,
                11: 0,
                12: 0,
                13: 0,
                14: 0,
                15: 0,
                16: 0,
                17: 0,
                18: 0,
                19: 0,
                20: 0,
                21: 0,
                22: 0,
                23: 0,
                24: 0,
                25: 0,
                26: 0,
                27: 0,
                28: 0,
                29: 0,
                30: 0,
                31: 0,
                32: 0,
                33: 0,
                34: 0,
                35: 0,
                36: 0,
                37: 0,
                38: 0,
                39: 0,
                40: 0,
                41: 0,
                42: 0,
                43: 0,
                44: 0,
                45: 0,
                46: 0,
                47: 0,
                48: 0,
                49: 0,
                50: 0,
                51: 0,
                52: 0,
                53: 0,
                54: 0,
                55: 0,
                56: 0,
                57: 0,
                58: 0,
                59: 0,
                60: 0,
                61: 0,
                62: 0,
                63: 0,
                64: 0,
                65: 0,
                66: 0,
                67: 0,
                68: 0,
                69: 0,
                70: 0,
                71: 0,
                72: 0,
                73: 0,
                74: 0,
                75: 0,
                76: 0,
                77: 0,
                78: 0,
                79: 0,
                80: 0,
                81: 0,
                82: 0,
                83: 0,
                84: 0,
                85: 0,
                86: 0,
                87: 0,
                88: 0,
                89: 0,
                90: 0,
                91: 0,
                92: 0,
                93: 0,
                94: 0,
                95: 0,
                96: 0,
                97: 0,
                98: 0,
                99: 0,
                100: 0,
                101: 0,
                102: 0,
                103: 0,
                104: 0,
                105: 0,
                106: 0,
                107: 0,
                108: 0,
                109: 0,
                110: 0,
                111: 0,
                112: 0,
                113: 0,
                114: 0,
                115: 0,
                116: 0,
                117: 0,
                118: 0,
                119: 0,
                120: 0,
                121: 0,
                122: 0,
                123: 0,
                124: 0,
                125: 0,
                126: 0,
                127: 0,
                128: 0,
                129: 0,
                130: 0,
                131: 0,
                132: 0,
                133: 0,
                134: 0,
                135: 0,
                136: 0,
                137: 0,
                138: 0,
                139: 0,
                140: 0,
                141: 0,
                142: 0,
                143: 0,
                144: 0,
                145: 0,
                146: 0,
                147: 0,
                148: 0,
                149: 0,
            },
        });
        await nuevoDocumento.save();

        const ahora = new Date();
        let fechaGuardada = new Date(ultimoDocumento.date);

        if (
            ahora.getFullYear() !== fechaGuardada.getFullYear() ||
            ahora.getMonth() !== fechaGuardada.getMonth() ||
            ahora.getDate() !== fechaGuardada.getDate()
        ) {
            while (
                ahora.getFullYear() !== fechaGuardada.getFullYear() ||
                ahora.getMonth() !== fechaGuardada.getMonth() ||
                ahora.getDate() !== fechaGuardada.getDate()
            ) {
                // Actualizar valores

                let yomiActual = Number(Object.keys(nuevoDocumento.yomi)[0]);
                let yomiIndex = (yomiActual + 1) % 150;
                // Incrementar yomi en 1 (asegurándote de que esté dentro del rango de 0 a 149)
                nuevoDocumento.yomi = { [yomiIndex]: 0 }; //yomi

                let shefer = Object.keys(nuevoDocumento.shefer); // Incrementar yomi en 1 (asegurándote de que esté dentro del rango de 0 a 149)
                const siguienteIndiceShefer =
                    Number(shefer[shefer.length - 1]) + 1;
                nuevoDocumento.shefer = valoresSheferArray(
                    siguienteIndiceShefer
                ); //shefer

                // Sumar 1 día
                fechaGuardada.setDate(fechaGuardada.getDate() + 1);
            }
            const hebrewDate = new HebrewDate(ahora); // LOG  {"date": 14, "month": 7, "month_name": "AdarII", "year": 5784}
            nuevoDocumento.jodsi = valoresJodsiArray(hebrewDate.date); //mes

            nuevoDocumento.date = ahora.toISOString(); //date

            const diaDeLaSemana = ahora.getDay();
            nuevoDocumento.svuy = valoresSvuyArray(diaDeLaSemana); //dia de la cemana

            nuevoDocumento.allSheferThogether = {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0,
                10: 0,
                11: 0,
                12: 0,
                13: 0,
                14: 0,
                15: 0,
                16: 0,
                17: 0,
                18: 0,
                19: 0,
                20: 0,
                21: 0,
                22: 0,
                23: 0,
                24: 0,
                25: 0,
                26: 0,
                27: 0,
                28: 0,
                29: 0,
                30: 0,
                31: 0,
                32: 0,
                33: 0,
                34: 0,
                35: 0,
                36: 0,
                37: 0,
                38: 0,
                39: 0,
                40: 0,
                41: 0,
                42: 0,
                43: 0,
                44: 0,
                45: 0,
                46: 0,
                47: 0,
                48: 0,
                49: 0,
                50: 0,
                51: 0,
                52: 0,
                53: 0,
                54: 0,
                55: 0,
                56: 0,
                57: 0,
                58: 0,
                59: 0,
                60: 0,
                61: 0,
                62: 0,
                63: 0,
                64: 0,
                65: 0,
                66: 0,
                67: 0,
                68: 0,
                69: 0,
                70: 0,
                71: 0,
                72: 0,
                73: 0,
                74: 0,
                75: 0,
                76: 0,
                77: 0,
                78: 0,
                79: 0,
                80: 0,
                81: 0,
                82: 0,
                83: 0,
                84: 0,
                85: 0,
                86: 0,
                87: 0,
                88: 0,
                89: 0,
                90: 0,
                91: 0,
                92: 0,
                93: 0,
                94: 0,
                95: 0,
                96: 0,
                97: 0,
                98: 0,
                99: 0,
                100: 0,
                101: 0,
                102: 0,
                103: 0,
                104: 0,
                105: 0,
                106: 0,
                107: 0,
                108: 0,
                109: 0,
                110: 0,
                111: 0,
                112: 0,
                113: 0,
                114: 0,
                115: 0,
                116: 0,
                117: 0,
                118: 0,
                119: 0,
                120: 0,
                121: 0,
                122: 0,
                123: 0,
                124: 0,
                125: 0,
                126: 0,
                127: 0,
                128: 0,
                129: 0,
                130: 0,
                131: 0,
                132: 0,
                133: 0,
                134: 0,
                135: 0,
                136: 0,
                137: 0,
                138: 0,
                139: 0,
                140: 0,
                141: 0,
                142: 0,
                143: 0,
                144: 0,
                145: 0,
                146: 0,
                147: 0,
                148: 0,
                149: 0,
            };
        }
        // Guarda el nuevo documento en la base de datos
        await nuevoDocumento.save();
    });
};

module.exports = iniciaCron;
