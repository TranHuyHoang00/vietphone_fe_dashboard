import { get_data_local } from '@auths/local_storage';

const check_permission = async (permission) => {
    let data_permissions = await get_data_local(process.env.REACT_APP_LOCALHOST_DATA_PERMISSIONS);
    const is_exist = data_permissions.includes(permission);
    if (is_exist) {
        return true
    } else {
        return false
    }
};
export { check_permission };
