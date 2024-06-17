import React from 'react';
import { Routes, Route} from 'react-router-dom';
import FileOpener from '../components/FileOpener';
import HomePage from '../components/HomePage';
import PageNotFound from '../components/PageNotFound';
import Histogram from '../components/Histogram';
import ECDF from "../components/ECDF";
import Indicators from '../components/Indicators';

const Router = () => {
    return (
        <Routes>
            <Route index path='/' element={<HomePage/>}/>
            <Route path='/file-opener' element={<FileOpener/>}>
                <Route path='histogram/:data/:elements/:b/:h' element={<Histogram/>}/>
                <Route path='ecdf/:data' element={<ECDF/>}/>
                <Route path='indicators/:data' element={<Indicators/>}/>
            </Route>
            <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    );
}

export default Router;
