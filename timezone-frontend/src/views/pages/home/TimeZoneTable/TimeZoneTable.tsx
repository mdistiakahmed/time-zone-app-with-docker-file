import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TablePagination from '@mui/material/TablePagination';
import { useContext } from 'react';
import { TimeZoneDataContext } from '../../../../context/TimeZoneDataContext';
import TableEntry from './TimeZoneTableEntry/TimeZoneTableEntry';

const TimeZoneTable = () => {
    const { timeZoneTableData, setPageNumber } =
        useContext(TimeZoneDataContext);
    const { timeZoneDataModelList, pageNumber, pageSize, totalElements } =
        timeZoneTableData;

    const onChangePage = (event: any, page: number) => {
        setPageNumber(page);
    };

    return (
        <Container component="main" sx={{ mt: 3 }}>
            <CssBaseline />
            <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
            >
                {timeZoneDataModelList.map((e) => {
                    return (
                        <Grid item minWidth={350} key={e.name}>
                            <TableEntry
                                name={e.name}
                                city={e.city}
                                hourDiff={e.hourDiff}
                                minuteDiff={e.minuteDiff}
                            />
                        </Grid>
                    );
                })}
            </Grid>
            <TablePagination
                component="div"
                rowsPerPageOptions={[]}
                count={totalElements}
                rowsPerPage={pageSize}
                page={pageNumber}
                onPageChange={onChangePage}
            />
        </Container>
    );
};

export default TimeZoneTable;
