
const getDataLocal = (name) => {
    const data = JSON.parse(window.localStorage.getItem(`${name}`));
    return data
}
const setDataLocal = (name, data) => {
    localStorage.setItem(`${name}`, JSON.stringify(
        { data: data }
    ))
}
const deleteDataLocal = (name) => {
    localStorage.removeItem(`${name}`);
    return true
}
export {
    getDataLocal, setDataLocal, deleteDataLocal
}