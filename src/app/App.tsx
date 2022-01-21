import React, {useEffect} from 'react';
import Header from '../common/components/Header/Header';
import Main from '../common/components/Main/Main';
import {useDispatch} from 'react-redux';
import {initializeApp} from '../redux/app-reducer';
import BgLoader from '../common/components/BgLoader/BgLoader';
import {useAppSelector} from '../redux/store';

function App() {
    const dispatch = useDispatch()
    // const isLoading = useAppSelector<boolean>(state => state.app.isLoading)
    // const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    // const navigate = useNavigate()
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(initializeApp())
    }, [dispatch])

    if(!isInitialized) return<BgLoader/>
    return (
        <div>
            <Header/>
            {/*{isLoading*/}
            {/*    ? <BgLoader/>*/}
            {/*    : <Main/>}*/}
            <Main/>
        </div>
    );
}

export default App;
