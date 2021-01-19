export default function validateInfo(values) {
    let errors = {}

    if (!values.userName.trim() || values.userName === null) {
        errors.userName = "! User Name required";
    }

    if (!values.userEmail) {
        errors.userEmail = '! Email required';
    } else if (!/\S+@\S+\.\S+/.test(values.userEmail)) {
        errors.userEmail = '! Email address is invalid';
    }

    if (!values.userPasswd) {
        errors.userPasswd = "! Password required";
    } else if(values.userPasswd.length < 6) {
        errors.userPasswd = "! Password needs to be 6 characters or more";
    }

    if (!values.userPasswdConfirm) {
        errors.userPasswdConfirm = "! Password required";
    } else if(values.userPasswd !== values.userPasswdConfirm) {
        errors.userPasswdConfirm = "! Password do not match";
    }

    if (!values.userTel) {
        errors.userTel = "! Phone number required";
    }

    return errors;
}