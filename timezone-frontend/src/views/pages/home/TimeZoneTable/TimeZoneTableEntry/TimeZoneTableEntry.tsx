import IconButton from '@mui/material/IconButton';
import { TimeZoneDataModel } from '../../../../../constants/DataModel';
import CustomCard from '../../../../common-components/CustomCard';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ClockSection from './ClockSection';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import TimeZoneDeleteModal from '../../TimeZoneModal/TimeZoneDeleteModal/TimeZoneDeleteModal';
import TimeZoneUpdateModal from '../../TimeZoneModal/TimeZoneUpdateModal/TimeZoneUpdateModal';

const PropertiesSection = ({
    hourDiff,
    minuteDiff,
}: {
    hourDiff: number;
    minuteDiff: number;
}) => {
    return (
        <Grid
            container
            spacing={2}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'space-between',
            }}
        >
            <Grid item>
                <TextField
                    value={hourDiff}
                    label={'Hour Diff With GMT'}
                    variant="outlined"
                    disabled={true}
                    size="small"
                />
            </Grid>
            <Grid item>
                <TextField
                    value={minuteDiff}
                    label={'Minute Diff With GMT'}
                    variant="outlined"
                    disabled={true}
                    size="small"
                />
            </Grid>
        </Grid>
    );
};

const TableEntry = ({
    name,
    city,
    hourDiff,
    minuteDiff,
}: TimeZoneDataModel) => {
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
    const title = <span>{name}</span>;
    const subheader = <p>{city}</p>;

    const body = () => {
        return (
            <Container sx={{ display: 'flex', flexDirection: 'row' }}>
                <PropertiesSection
                    hourDiff={hourDiff}
                    minuteDiff={minuteDiff}
                />
                <ClockSection hourDiff={hourDiff} minuteDiff={minuteDiff} />
            </Container>
        );
    };
    const actions = () => {
        return (
            <div>
                <IconButton
                    aria-label="edit"
                    onClick={() => {
                        setUpdateModalOpen(true);
                    }}
                >
                    <EditIcon />
                </IconButton>
                <IconButton
                    aria-label="delete"
                    onClick={() => {
                        setDeleteModalOpen(true);
                    }}
                >
                    <DeleteForeverIcon sx={{ fill: 'red' }} />
                </IconButton>
            </div>
        );
    };
    return (
        <div>
            <CustomCard
                title={title}
                subheader={subheader}
                body={body()}
                cardActions={actions()}
            />
            <TimeZoneDeleteModal
                isOpen={deleteModalOpen}
                onCancel={() => setDeleteModalOpen(false)}
                name={name}
            />
            <TimeZoneUpdateModal
                isOpen={updateModalOpen}
                onCancel={() => setUpdateModalOpen(false)}
                defaultValues={{
                    name: name,
                    city: city,
                    hourDiff: hourDiff,
                    minuteDiff: minuteDiff,
                }}
            />
        </div>
    );
};

export default TableEntry;
