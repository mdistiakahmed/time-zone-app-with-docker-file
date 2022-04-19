import AddButton from '../../common-components/AddButton';
import Topbar from '../../common-components/Topbar';
import TimeZoneCreateModal from './TimeZoneModal/TimeZoneCreateModal';
import useTimeZoneData from './useTimeZoneData';
import { TimeZoneDataContext } from '../../../context/TimeZoneDataContext';
import TimeZoneTable from './TimeZoneTable/TimeZoneTable';
import { useAuth } from '../../../hooks/useAuth';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';

const Home = () => {
    const timeZoneDataLogic = useTimeZoneData();
    const { allUserDataChecked, setAllUserDataChecked } = timeZoneDataLogic;
    const { isAdmin } = useAuth();
    return (
        <TimeZoneDataContext.Provider value={timeZoneDataLogic}>
            <div>
                <Topbar />
                {isAdmin && (
                    <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={() =>
                                        setAllUserDataChecked(
                                            !allUserDataChecked,
                                        )
                                    }
                                />
                            }
                            label="Show All Users Data"
                        />
                    </Box>
                )}
                <TimeZoneTable />
                <AddButton
                    onClick={() => timeZoneDataLogic.setAddModalOpen(true)}
                    title="Add New Timezone"
                />
                <TimeZoneCreateModal
                    isOpen={timeZoneDataLogic.addModalOpen}
                    onCancel={() => timeZoneDataLogic.setAddModalOpen(false)}
                />
            </div>
        </TimeZoneDataContext.Provider>
    );
};

export default Home;
