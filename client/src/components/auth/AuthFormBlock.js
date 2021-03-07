import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// 회원 가입/로그인에 공통적으로 사용되는 컴포넌트

const types = {
    login: '로그인',
    register: '회원가입',
};

const formBorderColor = ['rgba(0,0,0,.125)', '#dc3545', '#28a745'];

function AuthFormBlock({ type, form, onChange, onSubmit, error, styleMode }) {
    const text = types[type];
    const { email, password, password_check, fullname } = styleMode;
    console.log(styleMode);
    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h2>{text}</h2>
                    <Form onSubmit={onSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>이메일</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={form.email}
                                onChange={onChange}
                                style={{
                                    borderColor: formBorderColor[email],
                                }}
                            />
                            <Form.Control.Feedback
                                type="invalid"
                                style={email === 1 ? { display: 'block' } : {}}
                            >
                                올바른 이메일 형식이 아닙니다. (ex:
                                racer@example.com)
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={form.password}
                                onChange={onChange}
                                style={{
                                    borderColor: formBorderColor[password],
                                }}
                            />
                            <Form.Control.Feedback
                                type="invalid"
                                style={
                                    password === 1 ? { display: 'block' } : {}
                                }
                            >
                                비밀번호는 8자리 이상의 대소문자나 숫자로
                                작성하세요.
                            </Form.Control.Feedback>
                        </Form.Group>
                        {type === 'register' && (
                            <>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>비밀번호 확인</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password Check"
                                        name="password_check"
                                        value={form.password_check}
                                        onChange={onChange}
                                        style={{
                                            borderColor:
                                                formBorderColor[password_check],
                                        }}
                                    />
                                    <Form.Control.Feedback
                                        type="invalid"
                                        style={
                                            password_check === 1
                                                ? { display: 'block' }
                                                : {}
                                        }
                                    >
                                        비밀번호 확인 값이 다릅니다.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>이름</Form.Label>
                                    <Form.Control
                                        placeholder="Fullname"
                                        name="fullname"
                                        value={form.fullname}
                                        onChange={onChange}
                                        style={{
                                            borderColor:
                                                formBorderColor[fullname],
                                        }}
                                    />
                                    <Form.Control.Feedback
                                        type="invalid"
                                        style={
                                            fullname === 1
                                                ? { display: 'block' }
                                                : {}
                                        }
                                    >
                                        이름은 2글자 이상 입력하셔야 합니다.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </>
                        )}
                        <Button variant="primary" type="submit">
                            {text}
                        </Button>
                    </Form>
                    {type === 'login' ? (
                        <Alert
                            variant="secondary"
                            style={{ marginTop: '20px' }}
                        >
                            회원이 아니라면 👉🏻
                            <a href="/register">회원가입</a>
                        </Alert>
                    ) : (
                        <Alert
                            variant="secondary"
                            style={{ marginTop: '20px' }}
                        >
                            계정이 있다면 👉🏻 <a href="/login">로그인</a>
                        </Alert>
                    )}
                    {error && <Alert variant="danger">{error}</Alert>}
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
    error: PropTypes.string,
    styleMode: PropTypes.object,
};

export default AuthFormBlock;
