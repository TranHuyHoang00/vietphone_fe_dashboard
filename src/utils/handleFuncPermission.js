const handleCheckPermission = (dataPermissionsBeforeCheck, dataUserPermissions, isSuperUser) => {
    let dataPermissionsAfterCheck = {};
    if (isSuperUser !== undefined && isSuperUser !== null) {
        if (isSuperUser === false) {
            if (dataPermissionsBeforeCheck && dataPermissionsBeforeCheck.length !== 0) {
                for (const item of dataPermissionsBeforeCheck) {
                    if (dataUserPermissions.includes(item)) {
                        dataPermissionsAfterCheck[item] = true;
                    } else {
                        dataPermissionsAfterCheck[item] = false;
                    }
                }
            }
        } else {
            if (dataPermissionsBeforeCheck && dataPermissionsBeforeCheck.length !== 0) {
                for (const item of dataPermissionsBeforeCheck) {
                    dataPermissionsAfterCheck[item] = true;
                }
            }
        }
    }
    return dataPermissionsAfterCheck;

};
export { handleCheckPermission };
