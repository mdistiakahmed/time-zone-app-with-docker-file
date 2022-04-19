import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const AddButton = ({ onClick, title }: AddButtonProps): JSX.Element => {
    return (
        <Tooltip title={title}>
            <IconButton
                aria-label="add"
                sx={{ position: 'fixed', zIndex: 999, bottom: 10, left: 5 }}
                onClick={onClick}
            >
                <AddCircleOutlineIcon
                    color="primary"
                    sx={{
                        ':hover': { transform: 'scale(1.2)' },
                        minHeight: 50,
                        minWidth: 50,
                    }}
                />
            </IconButton>
        </Tooltip>
    );
};

export default AddButton;

type AddButtonProps = {
    onClick: () => void;
    title: string;
};
