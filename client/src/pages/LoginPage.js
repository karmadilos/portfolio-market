import React from 'react';
import PageTemplate from '../components/PageTemplate';
import LoginForm from '../containers/auth/LoginForm';
// import NavBar from '../containers/auth/NavBar';

function Login() {
    return (
        <PageTemplate>
            <>
                <LoginForm />
            </>
        </PageTemplate>
    );
}

export default Login;
