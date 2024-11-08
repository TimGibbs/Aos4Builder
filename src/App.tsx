import './App.css';

import {  Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListBuilder from './Pages/ListBuilder';
import ListsSelector from './Pages/ListsSelector';
import Home from './Pages/Home';
import Navigation from './Components/NavBar';

function App() {
  return (
    <Router>
      <Navigation />
      <Container className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lists" element={<ListsSelector />} />
          <Route path="/edit/:id" element={<ListBuilder />} />
        </Routes>
      </Container>
    </Router>
  );
}



export default App;
