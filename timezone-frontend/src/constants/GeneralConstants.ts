export enum UserRoles {
    USER = 'User',
    ADMIN = 'Admin',
}

export enum AlertSeverity {
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info',
    SUCCESS = 'success',
}

export enum AuthConstants {
    AUTH_TOKEN = 'AUTH_TOKEN',
    ROLE_ADMIN = 'ROLE_ADMIN',
    ROLE_USER = 'ROLE_USER',
}

export class PageLimit {
    static USER_PAGE_LIMIT = 10;
    static HOME_PAGE_LIMIT = 10;
}

// ['User','Admin']
export const UserRoleArray = Object.values(UserRoles);
