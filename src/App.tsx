import './App.css';

import { Container } from 'react-bootstrap';
import { Routes, Route, HashRouter } from 'react-router-dom';
import ListBuilder from './Pages/ListBuilder';
import ListsSelector from './Pages/ListsSelector';
import Home from './Pages/Home';
import Navigation from './Components/NavBar';
import AbilityCatalogue from './Pages/AbilityCatalogue';
import WarscrollCatalogue from './Pages/WarscrollCatalogue';
import ListDisplay from './Pages/ListDetails';
import { DataProvider } from './Hooks/useData';

function App() {
  return (
    <DataProvider>
      <HashRouter>
        <Navigation />
        <Container className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lists" element={<ListsSelector />} />
            <Route path="/edit/:id" element={<ListBuilder />} />
            <Route path="/abilities" element={<AbilityCatalogue />} />
            <Route path="/warscrolls" element={<WarscrollCatalogue />} />
            <Route path="/display/:id" element={<ListDisplay />} />
          </Routes>
        </Container>
      </HashRouter>
    </DataProvider>
  );
}



export default App;
