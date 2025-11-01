import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import MovieDetail from './MovieDetail';
import About from './About';
import NotFound from './NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detalhe" element={<MovieDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;