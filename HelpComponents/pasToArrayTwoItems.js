const pasToArrayTwoItems = (dondeEmpieza, siguiente) => {
    const resultado = {};
    let actual = dondeEmpieza;

    while (actual !== siguiente) {
        resultado[actual] = 0;
        actual = (actual + 1) % 150;
    }

    // Agrega el último valor (siguiente)
    resultado[siguiente] = 0;

    return resultado;
};

module.exports = pasToArrayTwoItems;
