
const getUrlApi = (dataFilter) => {
    const queryParts = [];
    for (const [key, value] of Object.entries(dataFilter)) {
        if (value !== undefined && value !== null && value !== '') {
            queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
        }
    }
    const queryString = queryParts.join('&');
    return queryString;
};
export {
    getUrlApi,
}