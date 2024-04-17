import { notification } from 'antd';
const show_notification = (error) => {
    if (error?.response) {
        let description = '';
        if (error?.response?.status === 400) {
            Object.entries(error?.response?.data?.error).forEach(([key, values]) => {
                values.forEach(value => {
                    description += `${key}:${value}\n`;
                });
            });
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