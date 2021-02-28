/* eslint-disable react/react-in-jsx-scope */
import { Route, withRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Network from './pages/Nework';
import Portfolio from './pages/Portfolio';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Route component={Home} path='/' exact />
      <Route component={Login} path='/login' />
      <Route component={Register} path='/register' />
      <Route component={Network} path='/network' />
      <Route component={Portfolio} path={['/portfolio', '/portfolio:@user_id']} />
    </>
  );
}

export default withRouter(App);
