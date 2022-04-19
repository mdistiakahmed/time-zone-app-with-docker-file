import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { TimeZoneDataModel } from '../../../../../constants/DataModel';
import Modal from '../../../../common-components/Modal';
import { FormInputText } from '../../../../forms/FormInputText';
import useTimeZoneUpdateModalData from './useTimeZoneUpdateModalData';

const TimeZoneUpdateModal = ({
    isOpen,
    onCancel,
    defaultValues,
}: TimeZoneUpdateModalProps) => {
    const { handleSubmit, control, onDialogClose, onSubmitDialog } =
        useTimeZoneUpdateModalData({
            isOpen,
            onCancel,
            defaultValues,
        });

    const title = <Alert severity={'info'}>Edit TimeZone</Alert>;

    const body = () => {
        return (
            <Box
                sx={{
                    marginTop: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: 2,
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormInputText
                            name="name"
                            control={control}
                            label="Name"
                            type="text"
                            disabled={true}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormInputText
                            name="city"
                            control={control}
                            label="City"
                            type="text"
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormInputText
                            name="hourDiff"
                            control={control}
                            label="Hour Diff to GMT"
                            type="number"
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormInputText
                            name="minuteDiff"
                            control={control}
                            label="Minute Diff to GMT"
                            type="number"
                            required={true}
                        />
                    </Grid>
                </Grid>
            </Box>
        );
    };

    const actions = () => {
        return (
            <div>
                <Button onClick={onDialogClose}> Cancel </Button>
                <Button onClick={handleSubmit(onSubmitDialog)}>Update</Button>
            </div>
        );
    };

    return (
        <Modal
            title={title}
            isOpen={isOpen}
            onClose={onDialogClose}
            body={body()}
            modalActions={actions()}
        />
    );
};

export default TimeZoneUpdateModal;

export type TimeZoneUpdateModalProps = {
    isOpen: boolean;
    onCancel: any;
    defaultValues: TimeZoneDataModel;
};
