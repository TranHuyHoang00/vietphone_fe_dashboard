
const get_data_local = (name) => {
    let data = JSON.parse(window.localStorage.getItem(`${name}`));
    return data
}
const set_data_local = (name, data) => {
    localStorage.setItem(`${name}`, JSON.stringify(
        { data: data }
    ))
}
const remove_data_local = (name) => {
    localStorage.removeItem(`${name}`);
    return true
}
export {
    get_data_local, set_data_local, remove_data_local
}