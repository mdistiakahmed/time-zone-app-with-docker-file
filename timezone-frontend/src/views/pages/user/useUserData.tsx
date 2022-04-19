import { useEffect, useState } from 'react';
import { UserCreateModel, UserTableData } from '../../../constants/DataModel';
import useUserService from '../../../services/useUserService';
//import { PageLimit } from '../../../constants/GeneralConstants';

const useUserData = () => {
    const [userTableData, setUserTableData] = useState<UserTableData>({
        userData: [],
        pageNumber: 0,
        pageSize: 0,
        totalElements: 0,
    });
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
    const userService = useUserService();

    const setPageNumber = (pageNo: number) => {
        setUserTableData({
            ...userTableData,
            pageNumber: pageNo,
        });
    };

    const loadData = async (): Promise<any> => {
        // set loader state = true
        userService
            .getAllUsers(userTableData.pageNumber, 2) //PageLimit.USER_PAGE_LIMIT
            .then((res) => {
                setUserTableData({
                    ...userTableData,
                    userData: res.userList,
                    pageSize: res.pageSize,
                    pageNumber: res.pageNo,
                    totalElements: res.totalElements,
                });
                return Promise.resolve(res);
            });
    };

    const deleteData = async (username: string): Promise<any> => {
        return userService.deleteUser(username).then(async (result) => {
            return loadData();
        });
    };

    const createData = async (data: UserCreateModel): Promise<any> => {
        return userService
            .createUser(data)
            .then(async (result) => {
                loadData();
                return Promise.resolve();
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };

    const updateData = async (email: string, role: string): Promise<any> => {
        const isSysAdmin = role === 'admin';
        return userService
            .updateUser({
                email: email,
                sysadmin: isSysAdmin,
            })
            .then(async (result) => {
                return loadData();
            });
    };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userTableData.pageNumber]);

    return {
        loadData,
        deleteData,
        updateData,
        createData,
        setPageNumber,
        userTableData,
        createModalOpen,
        setCreateModalOpen,
    };
};

export default useUserData;
