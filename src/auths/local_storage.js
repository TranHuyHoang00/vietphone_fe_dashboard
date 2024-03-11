
const get_local_account = (name) => {
    let data = JSON.parse(window.localStorage.getItem(`${name}`));
    return data
}
const set_local_account = (name, data) => {
    localStorage.setItem(`${name}`, JSON.stringify(
        { data: data }
    ))
}
const remove_local_account = (name) => {
    localStorage.removeItem(`${name}`);
    return true
}
export {
    get_local_account, set_local_account, remove_local_account
}