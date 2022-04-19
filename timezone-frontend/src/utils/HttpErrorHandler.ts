import { AppReducerActionKind } from '../hooks/useAppReducer';

const HttpErrorHandler = (error: any, dispatch: any) => {
    let errorMessage = '';
    if (error.response) {
        // The client was given an error response (5xx, 4xx)
        
        console.log(error.response);
        if (error.response.status === 400) {
            errorMessage = error.response.data?.message || 'Invalid Data';
        } else if (error.response.status === 401) {
            errorMessage = error.response.data?.message || 'Unauthorized Request';
        } else if (error.response.status === 403) {
            errorMessage = error.response.data?.message || 'Access Denied';
        } else if (error.response.status === 404) {
            errorMessage = error.response.data?.message || 'Page not found';
        } else if (error.response.status === 409) {
            errorMessage = error.response.data?.message || 'Conflicting Data';
        } else {
            errorMessage = 'Error... ' + error.message;
        }
    } else if (error.request) {
        // The client never received a response, and the request was never left
        errorMessage = 'Server is not responding, try again';
    } else {
        // Anything else
        errorMessage = 'Something went wrong. Try agian. Details: ';
    }
    dispatch({
        type: AppReducerActionKind.SET_ALERT,
        payload: { msg: errorMessage },
    });
};

export default HttpErrorHandler;
