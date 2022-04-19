import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { TimeZoneDataContext } from '../../../../../context/TimeZoneDataContext';
import Modal from '../../../../common-components/Modal';

const TimeZoneDeleteModal = ({
    isOpen,
    onCancel,
    name,
}: TimeZoneDeleteModalProps) => {
    const { deleteTimeZone } = useContext(TimeZoneDataContext);

    const deleteConfirmed = async () => {
        await deleteTimeZone(name);
        onCancel();
    };
    const title = <Alert severity={'error'}>Delete confirmation</Alert>;

    const body = () => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <p>Sure want to delete this TimeZone entry?</p>
                <p>Name: {name}</p>
            </Box>
        );
    };

    const actions = () => {
        return (
            <div>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={deleteConfirmed}>Delete</Button>
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

export default TimeZoneDeleteModal;

export type TimeZoneDeleteModalProps = {
    isOpen: boolean;
    onCancel: any;
    name: string;
};
