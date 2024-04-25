import { notification } from 'antd';
const show_notification = (error) => {
    if (error?.response) {
        let description = '';
        if (error?.response?.status === 400) {
            if (error?.response?.data?.error)
                Object.entries(error?.response?.data?.error).forEach(([key, values]) => {
                    if (Array.isArray(values)) {
                        values.forEach(value => {
                            description += `${key}:${value}\n`;
                        });
                    } else {
                        description += `${key}:${values}\n`;
                    }

                });
        }
        if (error?.response?.status === 403) {
            if (error?.response?.data?.error) {
                description += `Bạn không có quyền với tác vụ này !!!`
            }
        }
        notification.error({
            message: `${error?.response?.status} - ${error?.response?.statusText}`,
            description: description,
            duration: 100,
        });
    }
};
export {
    show_notification
}