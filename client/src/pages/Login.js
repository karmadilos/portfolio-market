import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function Login() {
    const initialInput = { email: '', password: '' };
    const [inputs, setInputs] = useState(initialInput);
    const { email, password } = inputs;
    const changeInputs = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    const login = async (e) => {
        e.preventDefault();
        // [Reference] https://forteleaf.tistory.com/entry/axiospost-%EC%97%90-form-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%A5%BC-%EB%84%A3%EA%B8%B0
        let form = new FormData();
        form.append('email', inputs.email);
        form.append('password', inputs.password);
        setInputs(initialInput);
        try {
            await axios
                .post('http://localhost:5000/auth/login', form)
                .then((res) => {
                    console.log(JSON.stringify(res));
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <Container>
            <Row>
                <Col md={{ span: 12, offset: 3 }}>
                    <Form onSubmit={login} className="col-md-6">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={email}
                                onChange={changeInputs}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={changeInputs}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    <p>회원이 아니라면 👉🏻 <a href="/register">회원가입하러가기</a></p>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
