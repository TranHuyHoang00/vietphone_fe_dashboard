const add_key_ant = (data) => {
    let index = 1;
    return data.map(item => {
        return { ...item, key: index++ };
    });
};
export {
    add_key_ant
}