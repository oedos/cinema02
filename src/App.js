import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/App.css';
import Home from './Home';
import MovieDetail from './MovieDetail';
import Login from './Login';
import SeatSelection from './SeatSelection';
import Pagamento from './Pagamento';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/filme/:id/assentos" component={SeatSelection} />
                <Route path="/filme/:id" component={MovieDetail} />
                <Route path="/login" component={Login} />
                <Route path="/pagamento" component={Pagamento} />
            </Switch>
        </Router>
    );
}

export default App;