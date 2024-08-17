const pasToArrayTwoItems = require('./pasToArrayTwoItems');

function valoresJodsiArray(params) {
    switch (params) {
        case 1:
            return pasToArrayTwoItems(0, 9);
        case 2:
            return pasToArrayTwoItems(10, 16);
        case 3:
            return pasToArrayTwoItems(17, 22);
        case 4:
            return pasToArrayTwoItems(23, 27);
        case 5:
            return pasToArrayTwoItems(28, 33);
        case 6:
            return pasToArrayTwoItems(34, 37);
        case 7:
            return pasToArrayTwoItems(38, 42);
        case 8:
            return pasToArrayTwoItems(43, 47);
        case 9:
            return pasToArrayTwoItems(48, 53);
        case 10:
            return pasToArrayTwoItems(54, 58);
        case 11:
            return pasToArrayTwoItems(59, 64);
        case 12:
            return pasToArrayTwoItems(65, 67);
        case 13:
            return pasToArrayTwoItems(68, 70);
        case 14:
            return pasToArrayTwoItems(71, 75);
        case 15:
            return pasToArrayTwoItems(76, 77);
        case 16:
            return pasToArrayTwoItems(78, 81);
        case 17:
            return pasToArrayTwoItems(82, 86);
        case 18:
            return pasToArrayTwoItems(87, 88);
        case 19:
            return pasToArrayTwoItems(89, 95);
        case 20:
            return pasToArrayTwoItems(96, 102);
        case 21:
            return pasToArrayTwoItems(103, 104);
        case 22:
            return pasToArrayTwoItems(105, 106);
        case 23:
            return pasToArrayTwoItems(107, 111);
        case 24:
            return pasToArrayTwoItems(112, 117);
        case 25:
            return pasToArrayTwoItems(118, 118);
        case 26:
            return pasToArrayTwoItems(118, 118);
        case 27:
            return pasToArrayTwoItems(119, 133);
        case 28:
            return pasToArrayTwoItems(134, 138);
        case 29:
            return pasToArrayTwoItems(139, 149);
        default:
            return pasToArrayTwoItems(1, 1);
    }
}
module.exports = valoresJodsiArray;
