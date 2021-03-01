import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'react-bootstrap';
import UpdateForm from './UpdateForm';
import DatePicker from 'react-datepicker';

function Certificate({ mode }) {
    const [aqDate, setAqDate] = useState(new Date());
    return (
        <Form
            md={12}
            style={{
                margin: '20px 0px',
                textAlign: 'center',
                padding: '10px 10px',
            }}
        >
            {mode === 0 ? (
                <>
                    <h3>자격증명</h3>
                    <h5>자격증 발급처</h5>
                    <p style={{ color: 'gray' }}>{'SINCE 2021-01-01'}</p>
                </>
            ) : (
                <UpdateForm>
                    <>
                        <h3>
                            <Form.Control
                                md={'mb-6'}
                                type="text"
                                placeholder="자격증 명칭"
                                name="awardTitle"
                            />
                        </h3>
                        <div style={{ margin: '10px 0px' }}>
                            <Form.Control
                                md={'mb-6'}
                                type="text"
                                placeholder="자격증 발급처"
                                name="awardDesc"
                            />
                        </div>
                        {/* date picker 1개 */}
                        <Row>
                            <Col md={12}>
                                <Form.Label>자격증 취득일</Form.Label>
                                <DatePicker
                                    className="form-control"
                                    closeOnScroll={true}
                                    selected={aqDate}
                                    onChange={(date) => setAqDate(date)}
                                />
                            </Col>
                        </Row>
                    </>
                </UpdateForm>
            )}
        </Form>
    );
}

Certificate.propTypes = {
    mode: PropTypes.number,
};
export default Certificate;
