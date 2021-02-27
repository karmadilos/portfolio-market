import React from 'react';
import PropType from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

function PageTemplate({ children }) {
    return (
        <Container style={{ marginTop: '5%' }}>
            <Row>
                <Col md={12}>
                    {children}
                </Col>
            </Row>
        </Container>
    );
}

PageTemplate.propTypes = {
    children: PropType.element
}

export default PageTemplate;
