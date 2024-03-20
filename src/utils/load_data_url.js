const load_data_url = (data_filter, searchParams) => {
    const urlPage = parseInt(searchParams.get('page')) || 1;
    const urlLimit = parseInt(searchParams.get('limit')) || 5;
    const urlSearch_query = searchParams.get('search_query') || '';
    if (urlPage !== data_filter.page || urlLimit !== data_filter.limit || urlSearch_query !== data_filter.search_query) {
        data_filter.page = urlPage;
        data_filter.limit = urlLimit;
        data_filter.search_query = urlSearch_query;
    }
    return data_filter;
};
export {
    load_data_url
}