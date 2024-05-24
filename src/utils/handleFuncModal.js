const handleOpenModal = async (modalName, modalValue, itemId, actions) => {
    const { setData, getData } = actions;
    await setData({});
    let newStateModal;
    switch (modalName) {
        case 'create':
            newStateModal = { modal_create: modalValue };
            break;
        case 'detail':
            if (itemId !== undefined) { await getData(itemId); }
            newStateModal = { modal_detail: modalValue };
            break;
        case 'edit':
            if (itemId !== undefined) { await getData(itemId); }
            newStateModal = { modal_edit: modalValue };
            break;
        default:
            return;
    }
    return newStateModal;
};
export {
    handleOpenModal
}