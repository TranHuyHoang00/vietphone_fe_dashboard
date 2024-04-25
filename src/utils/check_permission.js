const check_permission = (data_after_checks, data_user_permissions, is_superuser) => {
    let data_before_checks = {};
    if (is_superuser !== undefined && is_superuser !== null) {
        if (is_superuser === false) {
            if (data_after_checks && data_after_checks.length !== 0) {
                for (const item of data_after_checks) {
                    if (data_user_permissions.includes(item)) {
                        data_before_checks[item] = true;
                    } else {
                        data_before_checks[item] = false;
                    }
                }
            }
        } else {
            if (data_after_checks && data_after_checks.length !== 0) {
                for (const item of data_after_checks) {
                    data_before_checks[item] = true;
                }
            }
        }
    }
    return data_before_checks;

};
export { check_permission };
