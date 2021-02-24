import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import AuthFormBlock from '../../components/auth/AuthFormBlock';
import { changeInputs, formError, initializeForm, login } from '../../modules/auth';
import { withRouter } from 'react-router-dom';

function LoginForm({ history }) {
    const dispatch = useDispatch();
    const { form, authError } = useSelector(({ auth }) => ({
        form: auth.login,
        authError: auth.authError
    }));

    const onChange = (e) => {
        const { name, value } = e.target;
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
            dispatch(formError("아이디 OR 패스워드를 입력하세요."))
            return;
        }
        dispatch(login({ email, password })).payload
            .then(res => {
                if (res.login_success) {
                    history.push('/');
                }
                else {
                    dispatch(formError("아이디 또는 비밀번호가 틀렸습니다."))
                }
            })
    };

    useEffect(() => {
        dispatch(initializeForm('login'));
        dispatch(formError(''));
    }, [dispatch]);

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
    history: PropTypes.object
}

export default withRouter(LoginForm);
