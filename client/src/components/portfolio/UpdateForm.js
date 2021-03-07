import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';

// 업데이트 화면에 공통적으로 쌓여질 부모 컴포넌트
function UpdateForm({ children }) {
    // const aStyle = {
    //     opacity: '0.5',
    //     fontSize: '1.3rem',
    // };
    return (
        <>
            <Row className="row" id="edu" style={{ margin: '20px 0px' }}>
                <Form.Group as={Col} md={{ span: 7, offset: 3 }}>
                    {children}
                    {/* <div>
                        <a style={aStyle}>
                            <FontAwesomeIcon icon={faTrash} />
                        </a>
                    </div> */}
                </Form.Group>
            </Row>
        </>
    );
}

UpdateForm.propTypes = {
    children: PropTypes.element,
};

export default UpdateForm;
