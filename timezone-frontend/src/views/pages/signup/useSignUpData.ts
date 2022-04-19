import { useEffect, useState } from 'react';
import useAuthService from '../../../services/useAuthService';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { AnyObjectSchema } from 'yup';
import FormValidationConstants from '../../forms/FormValidationConstants';
import { yupResolver } from '@hookform/resolvers/yup';

interface IFormInput {
    email: string;
    password: string;
    confirmPassword: string;
}

const defaultValues = {
    email: '',
    password: '',
    confirmPassword: '',
};

const VALIDATION_SCHEMA: AnyObjectSchema = yup.object({
    email: FormValidationConstants.REQUIRED_VALID_EMAIL,
    password: yup.string().min(6, 'Minimum 6 Characters'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Password does not match'),
});

const useSignUpData = () => {
    const { handleSubmit, control } = useForm<IFormInput>({
        defaultValues: defaultValues,
        resolver: yupResolver(VALIDATION_SCHEMA),
    });
    const { signUp } = useAuthService();
    // show busy button
    const [busy, setBusy] = useState(false);

    const handleSignUpFormSubmit = async (data: IFormInput) => {
        setBusy(true);
        signUp({
            email: data.email,
            password: data.password,
            sysadmin: false,
        }).finally(() => {
            setBusy(false);
        });
    };
    useEffect(() => {
        // clear memory during exist form this page (component unmount)
        return () => {
            setBusy(false);
        };
    }, []);

    return {
        handleSubmit,
        control,
        handleSignUpFormSubmit,
        busy,
    };
};

export default useSignUpData;
