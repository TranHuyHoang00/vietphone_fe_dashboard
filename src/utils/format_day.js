const moment = require('moment');
const format_day = (timestamp) => {
    return moment(timestamp).format('HH:mm - DD/MM/YYYY');;
};
export {
    format_day
}