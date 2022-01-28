import Header from '../common/components/Header/Header';
import Main from '../pages/Main/Main';
import {Alert} from '../common/components/InfoAlert/Alert';
import {ScrollToTop} from '../common/components/ScrollToTop/ScrollToTop';

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
