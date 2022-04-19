import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { TIMEZONE_CREATE_VALIDATION_SCHEMA } from './TimeZoneCreateValidationSchema';
import { UserCreateModalProps } from '.';
import { useContext } from 'react';
import { TimeZoneDataContext } from '../../../../../context/TimeZoneDataContext';
import { TimeZoneDataModel } from '../../../../../constants/DataModel';

const defaultValues = {
    name: '',
    city: '',
    hourDiff: 0,
    minuteDiff: 0,
};

const useTimeZoneCreateModalData = ({
    isOpen,
    onCancel,
}: UserCreateModalProps) => {
    const { handleSubmit, control, reset } = useForm<TimeZoneDataModel>({
        defaultValues: defaultValues,
        resolver: yupResolver(TIMEZONE_CREATE_VALIDATION_SCHEMA),
    });

    //TODO:  method import from service class
    const { createTimeZone } = useContext(TimeZoneDataContext);

    const onSubmitDialog = async (data: TimeZoneDataModel) => {
        console.log(data);
        createTimeZone(data).then(() => onDialogClose());
    };

    const onDialogClose = () => {
        console.log('on dialog close....');
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

export default useTimeZoneCreateModalData;
