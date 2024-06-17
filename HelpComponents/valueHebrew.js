/////////////////////// calculo de hebreo las palabras //////////////////////////////////////////////
const hebrewValues = {
    א: 1,
    ב: 2,
    ג: 3,
    ד: 4,
    ה: 5,
    ו: 6,
    ז: 7,
    ח: 8,
    ט: 9,
    י: 10,
    כ: 20,
    ל: 30,
    מ: 40,
    נ: 50,
    ס: 60,
    ע: 70,
    פ: 80,
    צ: 90,
    ק: 100,
    ר: 200,
    ש: 300,
    ת: 400,
};

const assignHebrewValues = (hebrewString) => {
    let values = {};
    for (let i = 0; i < hebrewString.length; i++) {
        let char = hebrewString[i];
        if (hebrewValues[char]) {
            values[char] = hebrewValues[char];
        }
    }
    return values;
};

const sumHebrewValues = (hebrewString) => {
    hebrewObj = assignHebrewValues(hebrewString);
    let sum = 0;
    for (let char in hebrewObj) {
        sum += hebrewObj[char];
    }
    return sum;
};

//const hebrewString = "שלום"
//const hebrewValuesObj = assignHebrewValues(hebrewString)
//console.log(hebrewValuesObj) // Output: { ש: 300, ל: 30, ו: 6, ם: 40}
//console.log(sumHebrewValues(hebrewString)) // Output: 376

const getHebrewValue = (hebrewWord) => {
    let value = 0;
    for (let i = 0; i < hebrewWord.length; i++) {
        let char = hebrewWord[i];
        if (hebrewValues[char]) {
            value = hebrewValues[char];
        }
    }
    return value;
};

//const hebrewWord = "שלום"
//console.log(getHebrewValue(hebrewWord)) // Output: 300
///////////////////////////////////////////////////////////////////////////////////
