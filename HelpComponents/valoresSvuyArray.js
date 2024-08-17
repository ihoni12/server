const pasToArrayTwoItems = require('./pasToArrayTwoItems');

function valoresSvuyArray(params) {
    switch (params) {
        case 0:
        case 150:
            return pasToArrayTwoItems(0, 28);
        case 1:
        case 29:
            return pasToArrayTwoItems(29, 49);
        case 2:
        case 50:
            return pasToArrayTwoItems(50, 71);
        case 3:
        case 72:
            return pasToArrayTwoItems(72, 88);
        case 4:
        case 89:
            return pasToArrayTwoItems(89, 105);
        case 5:
        case 106:
            return pasToArrayTwoItems(106, 118);
        case 6:
        case 119:
            return pasToArrayTwoItems(119, 149);
    }
}
module.exports = valoresSvuyArray;
