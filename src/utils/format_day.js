const format_day = (number) => {
    var number_new = parseFloat(number).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 3
    });
    return number_new;
};
export {
    format_day
}