const moment = require('moment');
const formatDay = (timestamp) => {
    return moment(timestamp).format('HH:mm - DD/MM/YYYY');;
};
const formatMoney = (number) => {
    var newNumber = parseFloat(number).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 3
    });
    return `${newNumber} đ`;
};
const formatNumber = (number) => {
    var newNumber = parseFloat(number).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 3
    });
    return `${newNumber}`;
};
export {
    formatDay, formatMoney, formatNumber
}