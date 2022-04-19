import { useContext } from 'react';
import { ApiEndpoints } from '../constants/ApiEndpoints';
import { TimeZoneDataModel } from '../constants/DataModel';
import { ApplicationContext } from '../context/AppContext';
import HttpErrorHandler from '../utils/HttpErrorHandler';
import useUtilService from './useUtilService';

const useTimeZoneService = () => {
    const { apiHandler, dispatch } = useContext(ApplicationContext);
    const { setLoader, setMessage } = useUtilService();

    const getTimeZone = async (
        pageNo: number,
        pageSize: number,
        allUserDataChecked: boolean,
    ): Promise<any> => {
        setLoader(true);
        const url = allUserDataChecked
            ? ApiEndpoints.timeZone.getAllUsersTimeZone
            : ApiEndpoints.timeZone.getUserTimeZone;
        return apiHandler
            ._get(url, {
                params: { pageNo: pageNo, pageSize: pageSize },
            })
            .catch((error: any) => {
                HttpErrorHandler(error, dispatch);
                return Promise.reject(error);
            })
            .finally(() => {
                setLoader(false);
            });
    };

    const createTimeZone = async (data: TimeZoneDataModel): Promise<any> => {
        setLoader(true);
        return apiHandler
            ._post(ApiEndpoints.timeZone.createTimeZone, data)
            .then(() => {
                setMessage('TimeZone Created');
            })
            .catch((error: any) => {
                HttpErrorHandler(error, dispatch);
                return Promise.reject(error);
            })
            .finally(() => {
                setLoader(false);
            });
    };

    const deleteTimeZone = async (name: string): Promise<any> => {
        setLoader(true);
        return apiHandler
            ._delete(ApiEndpoints.timeZone.deleteTimeZone(name))
            .then((res: any) => {
                setMessage('Deleted');
                return Promise.resolve(res);
            })
            .catch((error: any) => {
                HttpErrorHandler(error, dispatch);
                return Promise.reject(error);
            })
            .finally(() => {
                setLoader(false);
            });
    };

    const updateTimeZone = async (data: TimeZoneDataModel): Promise<any> => {
        setLoader(true);
        return apiHandler
            ._put(ApiEndpoints.timeZone.updateTimeZone, data)
            .then((res: any) => {
                setMessage('Updated');
                return Promise.resolve(res);
            })
            .catch((error: any) => {
                HttpErrorHandler(error, dispatch);
                return Promise.reject(error);
            })
            .finally(() => {
                setLoader(false);
            });
    };

    return { createTimeZone, getTimeZone, deleteTimeZone, updateTimeZone };
};

export default useTimeZoneService;
