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
        case 'is_active':
            newDataFilter.is_active = pageValue;
            newDataFilter.page = 1;
            break;
        case 'is_superuser':
            newDataFilter.is_superuser = pageValue;
            newDataFilter.page = 1;
            break;
        case 'groups':
            newDataFilter.groups = pageValue;
            newDataFilter.page = 1;
            break;
        case 'status':
            newDataFilter.status = pageValue;
            newDataFilter.page = 1;
            break;
        case 'source':
            newDataFilter.source = pageValue;
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