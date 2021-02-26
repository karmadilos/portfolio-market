/* eslint-disable react/react-in-jsx-scope */
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Switch>
        <Route component={Home} path={['/@:userID', '/']} exact />
        <Route component={Login} path='/login' />
        <Route component={Register} path='/register' />
      </Switch>
    </>
  );
}

export default withRouter(App);
