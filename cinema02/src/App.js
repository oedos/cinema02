import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import MovieDetail from './MovieDetail';
import About from './About';
import NotFound from './NotFound';
import ProfilePage from './components/ProfilePage';
import ProdutorPage from './components/ProdutorPage'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detalhe/:id" element={<MovieDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/produtor" element={<ProdutorPage />} />
      </Routes>
    </Router>
  );
}

export default App;