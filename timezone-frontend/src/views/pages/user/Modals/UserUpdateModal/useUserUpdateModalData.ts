import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { UserDataContext } from '../../../../../context/UserDataContext';
import { ApplicationContext } from '../../../../../context/AppContext';
import { AppReducerActionKind } from '../../../../../hooks/useAppReducer';
import { USER_UPDATE_VALIDATION_SCHEMA } from './UserUpdateValidationSchema';
import { UserUpdateModalProps } from '.';

export type UserUpdateModalInput = {
    email: string;
    role: string;
};

const useUserUpdateModalData = ({
    isOpen,
    onCancel,
    defaultValues,
}: UserUpdateModalProps) => {
    const { handleSubmit, control, reset } = useForm<UserUpdateModalInput>({
        defaultValues: defaultValues,
        resolver: yupResolver(USER_UPDATE_VALIDATION_SCHEMA),
    });
    const { updateData } = useContext(UserDataContext);
    const { dispatch } = useContext(ApplicationContext);

    const onSubmitDialog = async (data: UserUpdateModalInput) => {
        if (defaultValues.role === data.role) {
            dispatch({
                type: AppReducerActionKind.SET_ALERT,
                payload: { msg: 'Nothing to update', type: 'warning' },
            });
        } else {
            await updateData(data.email, data.role?.toLocaleLowerCase());
            onCancel();
        }
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

export default useUserUpdateModalData;
