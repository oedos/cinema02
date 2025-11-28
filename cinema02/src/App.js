import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import MovieDetail from './MovieDetail';
import About from './About';
import NotFound from './NotFound';
import ProfilePage from './components/ProfilePage';
import ProdutorPage from './components/ProdutorPage'; 
import CadastroUsuario from './components/CadastroUsuario';
import Login from './components/Login';
import SelecionarCadeira from "./SelecionarCadeira";
import EditProfile from "./components/EditProfile";
import DetalheProdutor from './components/DetalheProdutor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/detalhe/:id" element={<MovieDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/produtor" element={<ProdutorPage />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />
        <Route path="/home" element={<Home />} />
        <Route path="/selecionar-cadeira/:filmeId/:shopping/:horario" element={<SelecionarCadeira />} />
        <Route path="/editar-perfil" element={<EditProfile />} />
        <Route path="/detalhe-produtor/:id" element={<DetalheProdutor />} />
      </Routes>
    </Router>
  );
}

export default App;