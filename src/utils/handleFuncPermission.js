const handleCheckPermis = (dataOriginalPermis, dataUserPermis, isSuperUser) => {
    let dataCheckPermis = {};
    if (isSuperUser !== undefined && isSuperUser !== null) {
        if (isSuperUser === false) {
            if (dataOriginalPermis && dataOriginalPermis.length !== 0) {
                for (const item of dataOriginalPermis) {
                    if (dataUserPermis.includes(item)) {
                        dataCheckPermis[item] = true;
                    } else {
                        dataCheckPermis[item] = false;
                    }
                }
            }
        } else {
            if (dataOriginalPermis && dataOriginalPermis.length !== 0) {
                for (const item of dataOriginalPermis) {
                    dataCheckPermis[item] = true;
                }
            }
        }
    }
    return dataCheckPermis;

};
export { handleCheckPermis };
