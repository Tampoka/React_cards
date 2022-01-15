import Header from "../common/components/Header/Header";
import Main from '../common/components/Main/Main';
import {useDispatch} from "react-redux";
import {useAppSelector} from "../redux/store";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {initializeApp} from "../redux/app-reducer";
import BgLoader from "../common/components/BgLoader/BgLoader";

function App() {
    const dispatch = useDispatch()
    const isLoading = useAppSelector<boolean>(state => state.app.isLoading)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const navigate = useNavigate()
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)

    useEffect(() => {
        dispatch((initializeApp()))
    }, [dispatch])


    return (
        <div>
            <Header/>
            {isLoading
                ? <BgLoader/>
                : <Main/>}
        </div>
    );
}

export default App;
