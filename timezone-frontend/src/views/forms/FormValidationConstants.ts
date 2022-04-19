import * as Yup from 'yup';

export default class FormValidationConstants {
    static REQUIRED_VALID_EMAIL = Yup.string()
        .matches(
            /^(?=.{1,40}$)[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
            {
                message: 'Invalid Email',
                excludeEmptyString: true,
            },
        )
        .required('Email is Required');

    static REQUIRED_VALID_PASSWORD = Yup.string()
        .required('Password is Required')
        .min(6, 'Minimum Digit 6')
        .max(20, 'Maximum Digit 20');
}
