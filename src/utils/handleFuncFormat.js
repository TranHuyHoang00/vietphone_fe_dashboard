const moment = require('moment');
const formatDay = (timestamp) => {
    return moment(timestamp).format('HH:mm - DD/MM/YYYY');;
};
const formatMoney = (number, min, max) => {
    var newNumber = parseFloat(number).toLocaleString('en-US', {
        minimumFractionDigits: min ? min : 0,
        maximumFractionDigits: max ? max : 0,
    });
    return `${newNumber} đ`;
};
const formatNumber = (number, min, max) => {
    var newNumber = parseFloat(number).toLocaleString('en-US', {
        minimumFractionDigits: min ? min : 0,
        maximumFractionDigits: max ? max : 0,
    });
    return `${newNumber}`;
};
export {
    formatDay, formatMoney, formatNumber
}