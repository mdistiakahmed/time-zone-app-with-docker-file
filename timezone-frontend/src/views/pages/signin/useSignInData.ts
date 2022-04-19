import { useEffect, useState } from 'react';
import useAuthService from '../../../services/useAuthService';
import * as yup from 'yup';
import { AnyObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { UserSignInModel } from '../../../constants/DataModel';

const defaultValues = {
    email: '',
    password: '',
};

const VALIDATION_SCHEMA: AnyObjectSchema = yup.object({
    email: yup.string().required('Please enter username'),
    password: yup.string().required('Please enter password'),
});

const useSignInData = () => {
    const { handleSubmit, control } = useForm<UserSignInModel>({
        defaultValues: defaultValues,
        resolver: yupResolver(VALIDATION_SCHEMA),
    });

    const [busy, setBusy] = useState<boolean>(false);
    const { signIn } = useAuthService();

    useEffect(() => {
        // clear memory during exist form this page (component unmount)
        return () => {
            setBusy(false);
        };
    }, []);

    const handleSignInFormSubmit = async (data: UserSignInModel) => {
        setBusy(true);
        signIn(data).finally(() => {
            setBusy(false);
        });
    };

    return {
        handleSubmit,
        control,
        handleSignInFormSubmit,
        busy,
    };
};

export default useSignInData;
