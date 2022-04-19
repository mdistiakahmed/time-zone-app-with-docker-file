import { createContext } from 'react';
import { AppReducerAction, AppState } from '../hooks/useAppReducer';

type AppContextType = {
    state: AppState;
    dispatch: (action: AppReducerAction) => void;
    apiHandler: {
        _get: (url: any, param: any) => any;
        _post: (url: any, data: any) => any;
        _put: (url: any, data: any) => any;
        _delete: (url: any) => any;
    };
};

const initialValue = {
    state: { token: { value: '' }, alert: { msg: '' }, isLoading: false },
    dispatch: () => {},
    apiHandler: {
        _get: () => {},
        _post: () => {},
        _put: () => {},
        _delete: () => {},
    },
};

export const ApplicationContext = createContext<AppContextType>(initialValue);
