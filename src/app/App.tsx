import Header from '../common/components/Header/Header';
import Main from '../pages/Main/Main';
import {Alert} from '../common/components/InfoAlert/Alert';
import {ScrollToTop} from '../common/components/ScrollToTop/ScrollToTop';
import {Navigate} from 'react-router-dom';
import {ROUTES} from '../routes/routes';
import React from 'react';
import {useAppSelector} from '../redux/store';

function App() {
    return (
        <div>
            <Alert/>
            <Header/>
            <Main/>
            <ScrollToTop/>
        </div>
    );
}

export default App;
