import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function UpdateForm({ children }) {
    const aStyle = {
        opacity: '0.5',
        fontSize: '1.3rem',
    };
    return (
        <>
            <Row className="row" id="edu" style={{ margin: '20px 0px' }}>
                <Form.Group as={Col} md={{ span: 6, offset: 3 }}>
                    {children}
                    <div>
                        <a style={aStyle}>
                            <FontAwesomeIcon icon={faTrash} />
                        </a>
                    </div>
                </Form.Group>
            </Row>
        </>
    );
}

UpdateForm.propTypes = {
    children: PropTypes.element,
};

export default UpdateForm;
