const pasToArrayTwoItems = require('./pasToArrayTwoItems');

function valoresSheferArray(params) {
    switch (params) {
        case 0:
        case 150:
            return pasToArrayTwoItems(0, 40);
        case 1:
        case 41:
            return pasToArrayTwoItems(41, 71);
        case 2:
        case 72:
            return pasToArrayTwoItems(72, 88);
        case 3:
        case 89:
            return pasToArrayTwoItems(89, 105);
        case 4:
        case 106:
            return pasToArrayTwoItems(106, 149);
        default:
            return pasToArrayTwoItems(0, 40);
    }
}

module.exports = valoresSheferArray;
