import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const types = {
    login: '로그인',
    register: '회원가입'
}

function AuthFormBlock({ type, form, onChange, onSubmit, error }) {
    const text = types[type];
    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h2>{text}</h2>
                    <Form onSubmit={onSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={form.email}
                                onChange={onChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={form.password}
                                onChange={onChange}
                            />
                        </Form.Group>
                        {type === 'register' && (
                            <>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password Check</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password Check"
                                        name="password_check"
                                        value={form.password_check}
                                        onChange={onChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Fullname</Form.Label>
                                    <Form.Control
                                        placeholder="Fullname"
                                        name="fullname"
                                        value={form.fullname}
                                        onChange={onChange}
                                    />
                                </Form.Group>
                            </>
                        )}
                        <Button variant="primary" type="submit">
                            {text}
                        </Button>
                    </Form>
                    {(type === 'login') ? (
                        <Alert variant="secondary" style={{ marginTop: "20px" }}>
                            회원이 아니라면 👉🏻
                            <Link to="/register">회원가입</Link>
                        </Alert>
                    )
                        : (
                            <Alert variant="secondary" style={{ marginTop: "20px" }}>
                                계정이 있다면 👉🏻 <Link to="/login">로그인</Link>
                            </Alert>
                        )
                    }
                    {error && (
                        <Alert variant="danger">
                            {error}
                        </Alert>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

AuthFormBlock.propTypes = {
    type: PropTypes.string,
    form: PropTypes.object,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    error: PropTypes.string
}

export default AuthFormBlock;
