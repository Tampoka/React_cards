import React from 'react';
import Header from '../common/components/Header/Header';
import Main from '../common/components/Main/Main';

function App() {
    // const isLoading = useAppSelector<boolean>(state => state.app.isLoading)
    // const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    // const navigate = useNavigate()

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
