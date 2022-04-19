import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import TablePagination from '@mui/material/TablePagination';

const fruits: string[] = [
    'Apple',
    'Orange',
    'Banana',
    'istiak',
    'ahmed',
    'nishat',
];

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const TimezoneCard = () => {
    const [expanded, setExpanded] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
        useState<boolean>(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card>
            <CardHeader
                title="Shrimp and Chorizo Paella abc abc abc"
                subheader="abc"
            />

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun
                    meal to cook together with your guests. Add 1 cup of frozen
                    peas along with the mussels, if you like.
                </Typography>
            </CardContent>

            <CardActions disableSpacing>
                <IconButton
                    aria-label="edit"
                    onClick={() => setEditDialogOpen(true)}
                >
                    <EditIcon />
                </IconButton>
                <IconButton
                    aria-label="delete"
                    onClick={() => setDeleteConfirmationOpen(true)}
                >
                    <DeleteForeverIcon sx={{ fill: 'red' }} />
                </IconButton>
                {true && (
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                )}
            </CardActions>

            {true && (
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph>
                            Heat 1/2 cup of the broth in a pot until simmering,
                            add saffron and set aside for 10 minutes.
                        </Typography>
                    </CardContent>
                </Collapse>
            )}
        </Card>
    );
};

const AllTimezones = () => {
    return (
        <Container component="main" sx={{ mt: 3 }}>
            <CssBaseline />
            <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
            >
                {fruits.map((e) => {
                    return (
                        <Grid item maxWidth={350} key={e}>
                            <TimezoneCard />
                        </Grid>
                    );
                })}
            </Grid>
            <TablePagination
                component="div"
                rowsPerPageOptions={[]}
                count={100}
                rowsPerPage={5}
                page={1}
                onPageChange={() => {}}
            />
        </Container>
    );
};

export default AllTimezones;

export type TimeZoneData = {
    name: string;
    city: string;
    hourdiff: number;
    mindiff: number;
};
