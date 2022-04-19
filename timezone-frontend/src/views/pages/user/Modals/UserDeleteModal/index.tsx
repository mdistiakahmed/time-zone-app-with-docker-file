import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '../../../../common-components/Modal';

const UserDeleteModal = ({
    isOpen,
    onCancel,
    onConfirm,
    email,
    role,
}: UserDeleteModalProps) => {
    const title = <Alert severity={'error'}>User Delete confirmation</Alert>;

    const body = () => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <p>
                    Sure want to delete this user? This will delete the user and
                    all the timezones enterd by this user
                </p>
                <h3>(Email) {email}</h3>
                <h3>(Role) {role}</h3>
            </Box>
        );
    };

    const actions = () => {
        return (
            <div>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={onConfirm}>Delete</Button>
            </div>
        );
    };

    return (
        <Modal
            title={title}
            isOpen={isOpen}
            onClose={onCancel}
            body={body()}
            modalActions={actions()}
        />
    );
};

export default UserDeleteModal;

export type UserDeleteModalProps = {
    isOpen: boolean;
    onCancel: any;
    onConfirm: () => void;
    email: string;
    role: string;
};
