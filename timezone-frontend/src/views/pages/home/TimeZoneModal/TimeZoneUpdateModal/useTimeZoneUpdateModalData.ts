import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { TimeZoneDataModel } from '../../../../../constants/DataModel';
import { TimeZoneDataContext } from '../../../../../context/TimeZoneDataContext';
import { TIMEZONE_CREATE_VALIDATION_SCHEMA } from '../TimeZoneCreateModal/TimeZoneCreateValidationSchema';
import { TimeZoneUpdateModalProps } from './TimeZoneUpdateModal';

const useTimeZoneUpdateModalData = ({
    isOpen,
    onCancel,
    defaultValues,
}: TimeZoneUpdateModalProps) => {
    const { handleSubmit, control, reset } = useForm<TimeZoneDataModel>({
        defaultValues: defaultValues,
        resolver: yupResolver(TIMEZONE_CREATE_VALIDATION_SCHEMA),
    });

    const { updateTimeZone } = useContext(TimeZoneDataContext);

    const onSubmitDialog = async (data: TimeZoneDataModel) => {
        updateTimeZone(data).then(() => onCancel());
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

export default useTimeZoneUpdateModalData;
