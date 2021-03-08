import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import AuthFormBlock from '../../components/auth/AuthFormBlock';
import {
    changeInputs,
    formError,
    initializeForm,
    register,
    setStyleMode,
} from '../../modules/auth';
import { withRouter } from 'react-router-dom';
import { ckIsValidPattern } from '../../lib/validation';

// 회원 가입 정보를 주고받는 Container 컴포넌트
function RegisterForm({ history }) {
    const dispatch = useDispatch();
    const { form, auth, authError, styleMode } = useSelector(({ auth }) => ({
        form: auth.register,
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
        if (name === 'password_check') {
            value === form['password']
                ? dispatch(setStyleMode({ type: name, mode: 2 }))
                : dispatch(setStyleMode({ type: name, mode: 1 }));
        }
        dispatch(
            changeInputs({
                type: 'register',
                key: name,
                value,
            }),
        );
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('onsubmit 호출');
        const { email, password, password_check, fullname } = form;
        console.log(email, password, password_check, fullname);
        if (!email || !password || !password_check || !fullname) {
            dispatch(formError('모든 값을 채워야합니다.'));
            return;
        }
        if (password !== password_check) {
            dispatch(formError('비밀번호와 비밀번호 확인이 다릅니다.'));
            return;
        }
        if (
            styleMode['email'] != 2 ||
            styleMode['password'] != 2 ||
            styleMode['password_check'] != 2 ||
            styleMode['fullname'] != 2
        ) {
            dispatch(formError('유효하지 않은 입력입니다.'));return;
        }
        dispatch(register({ email, password, fullname }));
    };

    useEffect(() => {
        dispatch(initializeForm('register'));
        dispatch(formError(''));
        dispatch(initializeForm('styleMode'));
    }, [dispatch]);

    useEffect(() => {
        if (auth.data) history.push('/login');
    }, [auth, authError]);

    return (
        <AuthFormBlock
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={authError}
            styleMode={styleMode}
        />
    );
}

RegisterForm.propTypes = {
    history: PropTypes.object,
};

export default withRouter(RegisterForm);
