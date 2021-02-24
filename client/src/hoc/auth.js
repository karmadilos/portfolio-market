/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { authUser } from '../modules/auth';
import { withRouter } from 'react-router-dom';

export default function (Component, option, _adminRoute = null) {
    //option
    // null => 아무나 출입가능
    // true => 로그인한 유저만 출입 가능
    // false => 로그인한 유저는 출입 불가능
    function AuthCheck({ history }) {
        const dispatch = useDispatch();
        //useEffect를 사용해서 초기 검증을 실행해준다
        useEffect(() => {
            dispatch(authUser()).payload.then((res) => {
                console.log(res);
                // if (!res.Auth)
                //     if (option)
                //         history.push('/login');
                //     else
                //         history.push('/');
            });
        }, []);

        return <Component />;
    }
    AuthCheck.propTypes = {
        history: PropTypes.object
    }
    return withRouter(AuthCheck);
}