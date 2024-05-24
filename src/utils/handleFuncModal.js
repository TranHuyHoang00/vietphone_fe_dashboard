const handleOpenModal = async (modalName, modalValue, itemId, actions) => {
    const { setData, getData } = actions;
    await setData({});
    let newStateModal;
    switch (modalName) {
        case 'create':
            newStateModal = { modalCreate: modalValue };
            break;
        case 'detail':
            if (itemId !== undefined) { await getData(itemId); }
            newStateModal = { modalDetail: modalValue };
            break;
        case 'edit':
            if (itemId !== undefined) { await getData(itemId); }
            newStateModal = { modalEdit: modalValue };
            break;
        default:
            return;
    }
    return newStateModal;
};
export {
    handleOpenModal
}