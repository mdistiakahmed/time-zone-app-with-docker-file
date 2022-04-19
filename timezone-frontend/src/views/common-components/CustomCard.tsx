import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

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

const CustomCard = ({
    title,
    subheader = null,
    body,
    cardActions,
    enableExpandButton = false,
    expandedBody = null,
}: CustomCardProps) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <Card>
            <CardHeader title={title} subheader={subheader} />
            <CardContent> {body} </CardContent>

            <CardActions disableSpacing>
                {cardActions}
                {enableExpandButton && (
                    <ExpandMore
                        expand={expanded}
                        onClick={() => setExpanded(!expanded)}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                )}
            </CardActions>

            {enableExpandButton && (
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>{expandedBody}</CardContent>
                </Collapse>
            )}
        </Card>
    );
};

export default CustomCard;

export type CustomCardProps = {
    title: JSX.Element;
    subheader?: JSX.Element | null;
    body: JSX.Element;
    cardActions?: JSX.Element;
    enableExpandButton?: boolean;
    expandedBody?: JSX.Element | null;
};
