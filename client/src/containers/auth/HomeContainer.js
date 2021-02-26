import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../../components/Nav';
import { logout } from '../../modules/auth';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function HomeContainer({ auth }) {
    const dispatch = useDispatch();
    const { user } = useSelector(({ auth }) => ({
        user: auth.user
    }));
    const onClick = (e) => {
        e.preventDefault();
        dispatch(logout());
    }
    return (
        <div>
            <div>
                <Nav url="/" name="HOME" onClick={onClick} />
                <Nav url="/" name="Network" onClick={onClick} />
                {!auth ? (
                    <Nav url="/login" name="Login" onClick={onClick} />
                ) : (
                        <Nav type="logout" name="Logout" onClick={onClick} />
                    )
                }
            </div>
            <div>{(user) ? (<b>{user.fullname}님</b>) : ''}레이서 포트폴리오 사이트 입니다.
        </div>
        </div>
    );
}

HomeContainer.propTypes = {
    auth: PropTypes.string,
}
export default withRouter(HomeContainer);
