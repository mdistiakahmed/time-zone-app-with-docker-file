import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import { styled } from '@mui/material/styles';
import { UserRoles } from '../../../../constants/GeneralConstants';
import { useContext } from 'react';
import { UserDataContext } from '../../../../context/UserDataContext';
import UserTableRow from './UserTableRow';

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'grey',
        color: 'white',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const UserTable = () => {
    const { userTableData, setPageNumber } = useContext(UserDataContext);
    const { userData, pageNumber, pageSize, totalElements } = userTableData;

    const onChangePage = (event: any, page: number) => {
        setPageNumber(page);
    };

    return (
        <Paper sx={{ mx: '10px', mt: '5px' }}>
            <TableContainer>
                <Table aria-label="user table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">
                                Email
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Role
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Action
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {userData.map((row) => (
                            <UserTableRow
                                key={row.email}
                                email={row.email}
                                role={
                                    row.sysadmin
                                        ? UserRoles.ADMIN
                                        : UserRoles.USER
                                }
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                rowsPerPageOptions={[]}
                count={totalElements}
                rowsPerPage={pageSize}
                page={pageNumber}
                onPageChange={onChangePage}
            />
        </Paper>
    );
};

export default UserTable;
