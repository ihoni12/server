const pasToArrayOneItem = (dondeEmpieza, cuantos) => {
    const resultado = [];
    for (let i = 0; i < cuantos; i++) {
        const numero = (dondeEmpieza + i) % 150;
        resultado.push(numero);
    }
    return resultado;
};
module.exports = pasToArrayOneItem;
