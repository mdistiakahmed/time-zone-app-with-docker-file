export class ApiEndpoints {
    static auth = {
        signIn: `/v1/sign-in`,
        signUp: `/v1/sign-up`,
    };

    static user = {
        getUsers: '/v1/users',
        createUser: '/v1/user',
        deleteUser: (username: string) => `/v1/users/${username}`,
        updateUser: '/v1/user',
    };

    static timeZone = {
        getUserTimeZone: '/v1/timezones',
        createTimeZone: '/v1/timezone',
        deleteTimeZone: (name: string) => `/v1/timezones/${name}`,
        updateTimeZone: '/v1/timezone',
        getAllUsersTimeZone: '/v1/timezones/all',
    };
}

export const URLsWithoutAuthorization = [
    ApiEndpoints.auth.signIn,
    ApiEndpoints.auth.signUp,
];
