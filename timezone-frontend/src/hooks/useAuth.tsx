import jwt_decode from 'jwt-decode';
import { AuthConstants } from '../constants/GeneralConstants';

export const useAuth = () => {
    let isAuthenticated = false;
    let isAdmin = false;
    const rawToken = localStorage.getItem(AuthConstants.AUTH_TOKEN);
    if (rawToken) {
        const decoded: any = jwt_decode(rawToken);
        if (decoded.exp * 1000 >= new Date().getTime()) {
            isAuthenticated = true;
        }
        if (decoded.roles === AuthConstants.ROLE_ADMIN) {
            isAdmin = true;
        }
    }

    return { isAuthenticated, isAdmin };
};
