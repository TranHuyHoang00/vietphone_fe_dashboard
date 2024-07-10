const handleFuncDropButtonHeaderOfTable = async (dropButtonType, listItemSelected, dataFilter, actions) => {
    const { deleteList, editList, getList } = actions;
    switch (dropButtonType) {
        case 1:
            await deleteList(listItemSelected);
            listItemSelected = [];
            break;
        case 2:
            await editList(listItemSelected, { is_active: false });
            break;
        case 3:
            await editList(listItemSelected, { is_active: true });
            break;
        case 4:
            await editList(listItemSelected, { status: 'inactive' });
            break;
        case 5:
            await editList(listItemSelected, { status: 'active' });
            break;
        default:
            return;
    }
    await getList(dataFilter);
    return listItemSelected;
};
export {
    handleFuncDropButtonHeaderOfTable
}