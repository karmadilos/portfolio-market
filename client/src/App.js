/* eslint-disable react/react-in-jsx-scope */
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from './hoc/auth';

function App() {
  return (
    <>
      <Switch>
        <Route component={Auth(Home, null)} path={['/@:userID', '/']} exact />
        <Route component={Auth(Login)} path='/login' />
        <Route component={Auth(Register)} path='/register' />
      </Switch>
    </>
  );
}

export default App;
