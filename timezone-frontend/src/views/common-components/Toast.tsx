import Alert, { AlertColor } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
import { AlertSeverity } from '../../constants/GeneralConstants';

const Toast = ({
    message = 'User Action Completed',
    alertSeverity = AlertSeverity.SUCCESS,
    show,
    onClose,
}: ToastProps) => {
    const [open, setOpen] = useState(show);
    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        onClose(false);
    };

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleClose}
                    severity={alertSeverity}
                    sx={{ width: '100%' }}
                    variant="filled"
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Toast;

type ToastProps = {
    message: string;
    alertSeverity?: AlertColor;
    show: boolean;
    onClose: (x: boolean) => void;
};
