import { ContentContextProvider } from './contexts/content-context';
import Routes from './routes';

function App() {
    return (
        <ContentContextProvider>
            <Routes />
        </ContentContextProvider>
    );
}

export default App;
