import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import EducationCreate from './EducationCreate';
import EducationUpdate from './EducationUpdate';

function Education({ mode }) {
    return (
        <Col mode='8'>
            <h4>학력</h4>
            {(mode === 'create') ? (
                <EducationCreate />
            ) :
                <EducationUpdate />
            }
        </Col>
    );
}

Education.propTypes = {
    mode: PropTypes.string
}

export default Education;
