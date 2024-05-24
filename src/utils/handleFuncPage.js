const handleOnChangePage = async (value, type, dataFilter) => {
    let newDataFilter = { ...dataFilter };
    switch (type) {
        case 'limit':
            newDataFilter.limit = value;
            break;
        case 'page':
            newDataFilter.page = value;
            break;
        case 'search':
            newDataFilter.search = value;
            newDataFilter.page = 1;
            break;
        default:
            break;
    }
    return newDataFilter;
};
export {
    handleOnChangePage
}