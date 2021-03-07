import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { logout } from '../../modules/auth';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCookie } from '../../lib/apis/client';
import { getUser } from '../../lib/apis/auth';
import { Nav, Navbar, Alert, Form } from 'react-bootstrap';

// 네이게이션 정보를 나타내는 container 컴포넌트
function NavBar({ history }) {
    const [user, setUser] = useState({ id: '', fullname: '' });
    const [error, setError] = useState(null);
    const [mode, setMode] = useState(true);
    const { profile } = useSelector(({ profile }) => ({
        profile: profile.profile,
    }));

    const dispatch = useDispatch();
    const onClick = (e) => {
        e.preventDefault();
        dispatch(logout());
    };
    const catchUser = () => ({
        id: sessionStorage.getItem('id'),
        fullname: sessionStorage.getItem('fullname'),
    });
    const resetUser = async () => {
        try {
            const res = await getUser();
            console.log(res.data.user);
            // setUser(res.data.user);
            const { id, fullname } = res.data.user;
            console.log(id, fullname);
            sessionStorage.setItem('id', id);
            sessionStorage.setItem('fullname', fullname);
            setUser(catchUser());
        } catch (err) {
            console.log(err.response.data);
            setError(err.response.msg);
            sessionStorage.clear();
            dispatch(logout());
            history.push('/');
        }
    };
    const onSwitch = () => setMode(!mode);
    useEffect(() => {
        if (!getCookie('csrf_access_token')) {
            // setUser(null);
            sessionStorage.clear();
        } else if (!user.id || !user.fullname) {
            resetUser();
        }
        if (
            profile.user_name &&
            profile.user_name !== user.fullname &&
            profile.id.toString() === user.id
        ) {
            resetUser();
        }
    }, [user, profile.user_name]);

    return (
        <>
            {error && <Alert variant="fail">{error}</Alert>}
            <Navbar fixed="top" expand="lg" variant="light" bg="light">
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fc90d82c1-277a-42a3-9e93-5624f3bff5d3%2FKDT_12x.png?table=block&id=fba44647-7b62-42b5-93a5-c3fdfb8d0187&width=250&userId=479b5c03-3ace-4f65-938c-026795f1021d&cache=v2"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    <b>Racer Portfolio</b>
                </Navbar.Brand>
                <Nav>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label={mode ? 'Light Mode' : 'Dark Mode'}
                        onClick={onSwitch}
                    />
                    {/* <Nav.Link href="/network">Network</Nav.Link> */}
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        {!user.id || !user.fullname ? (
                            <>
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/register">Register</Nav.Link>
                            </>
                        ) : (
                            <>
                                {user.id && user.fullname && (
                                    <Nav.Link
                                        href={'/portfolio/' + user.id}
                                        style={{ fontWeight: 'bold' }}
                                    >
                                        {user.fullname}
                                    </Nav.Link>
                                )}
                                <Nav.Link href="" onClick={onClick}>
                                    Logout
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

NavBar.propTypes = {
    history: PropTypes.object,
    user: PropTypes.any,
    setUser: PropTypes.func,
};
export default withRouter(NavBar);
