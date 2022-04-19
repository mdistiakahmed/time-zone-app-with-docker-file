import { createContext } from 'react';
import { UserCreateModel, UserTableData } from '../constants/DataModel';

export const UserDataContext = createContext<UserDataContextType>({
    userTableData: {
        userData: [],
        pageNumber: 0,
        pageSize: 0,
        totalElements: 0,
    },
    loadData: () => {
        return Promise.resolve();
    },
    deleteData: () => {
        return Promise.resolve();
    },
    updateData: () => {
        return Promise.resolve();
    },
    createData: () => {
        return Promise.resolve();
    },
    setPageNumber: () => {},
    createModalOpen: false,
    setCreateModalOpen: () => {},
});

export type UserDataContextType = {
    userTableData: UserTableData;
    loadData: () => Promise<any>;
    deleteData: (username: string) => Promise<any>;
    updateData: (username: string, role: string) => Promise<any>;
    createData: (data: UserCreateModel) => Promise<void>;
    setPageNumber: (pageNo: number) => void;
    createModalOpen: boolean;
    setCreateModalOpen: any;
};
