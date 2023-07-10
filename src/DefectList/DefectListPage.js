import React from 'react';
import DefectPage from './MainPageComponents/DefectList';
import DefectDataProvider from './DefectDataProvider';
import DefectTable from './MainPageComponents/DefectTable';
import { Paper } from '@mui/material';

const DefectListPage = () => {

    return(
        <DefectDataProvider>
                <Paper
                style={{
                    height: "80vh",
                    width: "100%",
                    padding: 0,
                    margin: 0,
                    backgroundColor: "#c6ffc8",
                }}
                >

                <DefectTable/>
                <DefectPage/>
                </Paper>
        </DefectDataProvider>
    )
}

export default DefectListPage