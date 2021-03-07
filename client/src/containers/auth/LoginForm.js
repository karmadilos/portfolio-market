import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import AuthFormBlock from '../../components/auth/AuthFormBlock';
import {
    changeInputs,
    formError,
    initializeForm,
    login,
} from '../../modules/auth';
import { withRouter } from 'react-router-dom';

// 로그인 정보를 교환하는 container 컴포넌트
function LoginForm({ history }) {
    const dispatch = useDispatch();
    const { form, auth, user, authError } = useSelector(({ auth }) => ({
        form: auth.login,
        auth: auth.auth,
        user: auth.user,
        authError: auth.authError,
    }));

    const onChange = (e) => {
        const { name, value } = e.target;
        if (!value) {
            // border color red
            // message를 각 폼에 전달한다.
        }
        dispatch(
            changeInputs({
                type: 'login',
                key: name,
                value,
            }),
        );
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const { email, password } = form;
        if (!email || !password) {
            dispatch(formError('아이디 OR 패스워드를 입력하세요.'));
            return;
        }
        dispatch(login({ email, password }));
    };

    useEffect(() => {
        dispatch(initializeForm('login'));
        dispatch(formError(''));
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            history.push('/');
            // try {
            //     localStorage.setItem('user', JSON.stringify(user));
            // } catch (e) {
            //     console.log("localStorage Error");
            // }
        }
    }, [history, auth, user]);
    return (
        <AuthFormBlock
            type="login"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={authError}
        />
    );
}

LoginForm.propTypes = {
    history: PropTypes.object,
};

export default withRouter(LoginForm);
