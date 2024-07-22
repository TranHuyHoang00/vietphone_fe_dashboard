const handleOpenModal = async (modalName, modalValue, itemId, actions) => {
    const { setData, getData } = actions;
    const modalActions = {
        create: async () => {
            await setData({});
            return { modalCreate: modalValue };
        },
        detail: async () => {
            if (itemId !== undefined) { await getData(itemId); }
            return { modalDetail: modalValue };
        },
        edit: async () => {
            if (itemId !== undefined) { await getData(itemId); }
            return { modalEdit: modalValue };
        },
    };
    const handleAction = modalActions[modalName];
    if (!handleAction) {
        return;
    }
    return await handleAction();
};
export {
    handleOpenModal
}