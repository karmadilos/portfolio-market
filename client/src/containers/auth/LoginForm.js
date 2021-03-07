import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import AuthFormBlock from '../../components/auth/AuthFormBlock';
import {
    changeInputs,
    formError,
    initializeForm,
    login,
    setStyleMode,
} from '../../modules/auth';
import { withRouter } from 'react-router-dom';
import { ckIsValidPattern } from '../../lib/validation';

// 로그인 정보를 교환하는 container 컴포넌트
function LoginForm({ history }) {
    const dispatch = useDispatch();
    const { form, auth, authError, styleMode } = useSelector(({ auth }) => ({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError,
        styleMode: auth.styleMode,
    }));

    const onChange = (e) => {
        const { name, value } = e.target;
        console.log(ckIsValidPattern({ type: name, value }));
        ckIsValidPattern({ type: name, value })
            ? dispatch(setStyleMode({ type: name, mode: 2 }))
            : dispatch(setStyleMode({ type: name, mode: 1 }));

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
        if (styleMode['email'] !== 2 || styleMode['password'] !== 2) {
            dispatch(formError('유효하지 않은 입력값입니다.'));
            return;
        }
        if (!email || !password) {
            dispatch(formError('아이디 OR 패스워드를 입력하세요.'));
            return;
        }
        dispatch(login({ email, password }));
    };

    useEffect(() => {
        if (sessionStorage.getItem('id')) {
            history.push('/');
        }
        if (auth.data) history.push('/');
        dispatch(initializeForm('login'));
        dispatch(formError(''));
        dispatch(initializeForm('styleMode'));
    }, [auth, dispatch]);

    return (
        <AuthFormBlock
            type="login"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={authError}
            styleMode={styleMode}
        />
    );
}

LoginForm.propTypes = {
    history: PropTypes.object,
};

export default withRouter(LoginForm);
