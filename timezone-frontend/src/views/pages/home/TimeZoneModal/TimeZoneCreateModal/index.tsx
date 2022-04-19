import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { FormInputText } from '../../../../forms/FormInputText';
import Box from '@mui/material/Box';
import useTimeZoneCreateModalData from './useTimeZoneCreateModalData';
import Modal from '../../../../common-components/Modal';
import Alert from '@mui/material/Alert';

const TimeZoneCreateModal = ({ isOpen, onCancel }: UserCreateModalProps) => {
    const { handleSubmit, control, onDialogClose, onSubmitDialog } =
        useTimeZoneCreateModalData({
            isOpen,
            onCancel,
        });
    const title = <Alert severity={'info'}>Add New TimeZone</Alert>;

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
                            required={true}
                            type="text"
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
                <Button onClick={handleSubmit(onSubmitDialog)}>Add</Button>
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

export default TimeZoneCreateModal;

export type UserCreateModalProps = {
    isOpen: boolean;
    onCancel: any;
};
