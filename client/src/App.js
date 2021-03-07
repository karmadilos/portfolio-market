/* eslint-disable react/react-in-jsx-scope */
import { Route, withRouter } from 'react-router-dom';
// import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NetworkPage from './pages/NeworkPage';
import PortfolioPage from './pages/PortfolioPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

function App() {
    return (
        <>
            {/* <Route component={HomePage} path="/" exact /> */}
            <Route component={LoginPage} path="/login" />
            <Route component={RegisterPage} path="/register" />
            <Route component={NetworkPage} path={['/', '/network']} exact />
            <Route
                component={PortfolioPage}
                path={['/portfolio', '/portfolio:@user_id']}
            />
        </>
    );
}

export default withRouter(App);
