import React from 'react';
import PageTemplate from '../components/PageTemplate';
import RegisterForm from '../containers/auth/RegisterForm';

function Register() {
    return (
        <PageTemplate>
            <>
                <RegisterForm />
            </>
        </PageTemplate>
    );
}

export default Register;
