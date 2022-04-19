import './App.css';
import RoutesHandler from './Routes';
import { useAppReducer } from '../hooks/useAppReducer';
import { ApplicationContext } from '../context/AppContext';
import ToastAlert from './pages/ToastAlert';
import { useApiHandler } from '../hooks/useApiHandler';
import Loader from './pages/Loader';

function App() {
    const { state, dispatch } = useAppReducer();
    const apiHandler = useApiHandler(dispatch);
    return (
        <ApplicationContext.Provider value={{ state, dispatch, apiHandler }}>
            <div className="App">
                <RoutesHandler />
                <ToastAlert />
                <Loader />
            </div>
        </ApplicationContext.Provider>
    );
}

export default App;
