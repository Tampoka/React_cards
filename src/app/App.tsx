import Header from "../common/components/Header/Header";
import Main from '../common/components/Main/Main';
import {useDispatch} from "react-redux";
import {useAppSelector} from "../redux/store";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Spinner from "../common/components/Spinner/Spinner";
import {initializeApp} from "../redux/app-reducer";

function App() {
    const dispatch = useDispatch()
    const isLoading = useAppSelector<boolean>(state => state.app.isLoading)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(initializeApp())
    }, [dispatch, isLoggedIn, navigate])

    // if (!isLoggedIn) navigate('./login', {replace: true})
    return (
        <div>
            <Header/>
            {isLoading && <h1>Is Loading</h1>}
            <Main/>
        </div>
    );
}

export default App;
