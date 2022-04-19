export type UserCreateModel = {
    email: string;
    password: string;
    sysadmin: boolean;
};

export type UserSignInModel = {
    email: string;
    password: string;
};

export type UserUpdateModel = {
    email: string;
    sysadmin: boolean;
};

export interface UserTableData {
    userData: UserUpdateModel[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
}

export type TimeZoneDataModel = {
    name: string;
    city: string;
    hourDiff: number;
    minuteDiff: number;
};

export interface TimeZoneTableDataModel {
    timeZoneDataModelList: TimeZoneDataModel[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
}
