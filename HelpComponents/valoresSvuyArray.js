const pasToArrayTwoItems = require('./pasToArrayTwoItems');

function valoresSvuyArray(params) {
    switch (params) {
        case 0:
        case 150:
            return pasToArrayTwoItems(0, 20);
        case 1:
        case 21:
            return pasToArrayTwoItems(21, 41);
        case 2:
        case 42:
            return pasToArrayTwoItems(42, 62);
        case 3:
        case 63:
            return pasToArrayTwoItems(63, 83);
        case 4:
        case 84:
            return pasToArrayTwoItems(84, 104);
        case 5:
        case 105:
            return pasToArrayTwoItems(105, 125);
        case 6:
        case 126:
            return pasToArrayTwoItems(126, 149);
    }
}
module.exports = valoresSvuyArray;
