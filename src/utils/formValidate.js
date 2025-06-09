const checkPassword = (_, value) => {
    if (!value) {
        return Promise.reject('请输入密码!');
    }
    return Promise.resolve();
}

const validateNewPassword = ({ getFieldValue }) => ({
    validator(_, value) {
        if (!value || getFieldValue("password") !== value) {
            return Promise.resolve();
        }
        return Promise.reject("新密码不能与原始密码一样!");
    },
});

const validateConfirmPassword = ({ getFieldValue }) => ({
    validator(_, value) {
        if (!value || getFieldValue("newPassword") === value) {
            return Promise.resolve();
        }
        return Promise.reject("与新密码不一致!");
    },
});

export { checkPassword, validateNewPassword, validateConfirmPassword }