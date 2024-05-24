const handleOnChangePage = async (pageValue, pageType, dataFilter) => {
    let newDataFilter = { ...dataFilter };
    switch (pageType) {
        case 'limit':
            newDataFilter.limit = pageValue;
            break;
        case 'page':
            newDataFilter.page = pageValue;
            break;
        case 'search':
            newDataFilter.search = pageValue;
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