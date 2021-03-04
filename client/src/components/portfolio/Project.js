import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, FormControl, Row, Col } from 'react-bootstrap';
import UpdateForm from './UpdateForm';
import DatePicker from 'react-datepicker';

function Project({ uid, pid, mode, title, desc, start, end }) {
    const [startDate, setStartDate] = useState(new Date(start));
    const [endDate, setEndDate] = useState(new Date(end));
    const dateOutput =
        start && end
            ? `${start} - ${end}`
            : !start
            ? `${end} - ${end}`
            : `${start} - ${start}`;
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
                    <h3>{title ? title : '프로젝트명'}</h3>
                    <h5>{desc ? desc : '프로젝트 설명'}</h5>
                    <p style={{ color: 'gray' }}>
                        {/**
                         * start만 있으면, end는 오늘날짜
                         * end만 있으면, start는 end
                         * 둘 다 없으면 둘 다 오늘날짜
                         */}
                        {dateOutput}
                    </p>
                </>
            ) : (
                <UpdateForm>
                    <>
                        <h3>
                            <Form.Control
                                md={'mb-6'}
                                type="text"
                                placeholder="프로젝트명"
                                name="awardTitle"
                            />
                        </h3>
                        <div style={{ margin: '10px 0px' }}>
                            <FormControl
                                as="textarea"
                                aria-label="With textarea"
                                md={'mb-6'}
                                placeholder="프로젝트 상세내용"
                                name="awardDesc"
                            />
                        </div>
                        <Row style={{ margin: '20px 0px' }}>
                            <Col>
                                <Form.Label>프로젝트 시작일</Form.Label>
                                <DatePicker
                                    className="form-control"
                                    closeOnScroll={true}
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                />
                            </Col>
                            {/* </div>
                        <div style={{ margin: '10px 0px' }}> */}
                            <Col>
                                <Form.Label>프로젝트 종료일</Form.Label>
                                <DatePicker
                                    style={{ display: 'block' }}
                                    className="form-control"
                                    closeOnScroll={true}
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                />
                            </Col>
                        </Row>
                    </>
                </UpdateForm>
            )}
        </Form>
    );
}

Project.propTypes = {
    mode: PropTypes.number,
};
export default Project;
