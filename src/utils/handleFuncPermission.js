const handleCheckPermission = (data_after_checks, dataUserPermissions, isSuperUser) => {
    let dataPermissionsAfterCheck = {};
    if (isSuperUser !== undefined && isSuperUser !== null) {
        if (isSuperUser === false) {
            if (data_after_checks && data_after_checks.length !== 0) {
                for (const item of data_after_checks) {
                    if (dataUserPermissions.includes(item)) {
                        dataPermissionsAfterCheck[item] = true;
                    } else {
                        dataPermissionsAfterCheck[item] = false;
                    }
                }
            }
        } else {
            if (data_after_checks && data_after_checks.length !== 0) {
                for (const item of data_after_checks) {
                    dataPermissionsAfterCheck[item] = true;
                }
            }
        }
    }
    return dataPermissionsAfterCheck;

};
export { handleCheckPermission };
