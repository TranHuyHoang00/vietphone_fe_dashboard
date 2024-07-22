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
        case 'product_brand':
            newDataFilter.product_brand = pageValue;
            newDataFilter.page = 1;
            break;
        case 'tag':
            newDataFilter.tag = pageValue;
            newDataFilter.page = 1;
            break;
        case 'category':
            newDataFilter.category = pageValue;
            newDataFilter.page = 1;
            break;
        case 'has_page':
            newDataFilter.has_page = pageValue;
            newDataFilter.page = 1;
            break;
        case 'month':
            newDataFilter.month = pageValue;
            newDataFilter.page = 1;
            break;
        case 'staff':
            newDataFilter.staff = pageValue;
            newDataFilter.page = 1;
            break;
        case 'assignee':
            newDataFilter.assignee = pageValue;
            newDataFilter.page = 1;
            break;
        case 'role':
            newDataFilter.role = pageValue;
            newDataFilter.page = 1;
            break;
        case 'shop':
            newDataFilter.shop = pageValue;
            newDataFilter.page = 1;
            break;
        case 'shift':
            newDataFilter.shift = pageValue;
            newDataFilter.page = 1;
            break;
        default:
            break;
    }
    return newDataFilter;
};
const compareObjects = async (obj1, obj2) => {
    const compareLists = (list1, list2) => {
        if (list1.length !== list2.length) return false;
        const sortedList1 = [...list1].sort();
        const sortedList2 = [...list2].sort();
        return JSON.stringify(sortedList1) === JSON.stringify(sortedList2);
    };
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    for (let key of keys1) {
        if (!keys2.includes(key)) return false;
        if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
            if (!compareLists(obj1[key], obj2[key])) return false;
        } else if (obj1[key] !== obj2[key]) {
            return false;
        }
    }
    return true;
}
export {
    handleOnChangePage, compareObjects
}