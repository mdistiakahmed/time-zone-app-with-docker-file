import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { UserDataContext } from '../../../../../context/UserDataContext';
import { UserRoles } from '../../../../../constants/GeneralConstants';
import { USER_CREATE_VALIDATION_SCHEMA } from './UserCreateValidationSchema';
import { UserCreateModalProps } from '.';

type IFUserCreateInput = {
    email: string;
    password: string;
    role: string;
};

const defaultValues = {
    email: '',
    password: '',
    role: '',
};

const useUserCreateModalData = ({ isOpen, onCancel }: UserCreateModalProps) => {
    const { handleSubmit, control, reset } = useForm<IFUserCreateInput>({
        defaultValues: defaultValues,
        resolver: yupResolver(USER_CREATE_VALIDATION_SCHEMA),
    });
    const { createData } = useContext(UserDataContext);

    const onSubmitDialog = async (data: IFUserCreateInput) => {
        const isSysAdmin = data.role === UserRoles.ADMIN;
        createData({
            email: data.email,
            password: data.password,
            sysadmin: isSysAdmin,
        }).then(() => {
            onDialogClose();
        });
    };

    const onDialogClose = () => {
        reset();
        onCancel();
    };

    return {
        handleSubmit,
        control,
        onDialogClose,
        onSubmitDialog,
    };
};

export default useUserCreateModalData;
