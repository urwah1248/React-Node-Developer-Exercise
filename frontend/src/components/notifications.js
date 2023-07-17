import { notification } from 'antd';

export const onFinish = () => {
    notification.success({
        message: 'Form Submitted',
        description: 'Your form has been submitted successfully.',
        duration: 3, // Duration in seconds
    });
};

export const onFinishFailed = (errorMessage) => {
    notification.error({
        message: 'Form Submission Failed',
        description: errorMessage,
        duration: 3, // Duration in seconds
    });
};

export const onDelete = (order) => {
    notification.success({
        message: 'Order Deleted',
        description: 'Order has been deleted successfully.',
        duration: 3, // Duration in seconds
    });
};