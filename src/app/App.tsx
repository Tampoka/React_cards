import Header from '../common/components/Header/Header';
import Main from '../common/components/Main/Main';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {initializeApp} from '../redux/app-reducer';

function App() {
    const dispatch = useDispatch()
    // const isLoading = useAppSelector<boolean>(state => state.app.isLoading)
    // const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    // const navigate = useNavigate()
    // const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(initializeApp())
    }, [dispatch])

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
