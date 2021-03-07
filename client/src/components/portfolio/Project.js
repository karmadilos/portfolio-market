import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteProject, setCache } from '../../modules/project';
import { getDate } from '../../lib/getDate';
import { Form, FormControl, Row, Col } from 'react-bootstrap';
import UpdateForm from './UpdateForm';
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const aStyle = {
    opacity: '0.5',
    fontSize: '1.3rem',
};

// 프로젝트 정보를 표시하는 컴포넌트
function Project({ uid, pid, mode, title, desc, start, end }) {
    const [startDate, setStartDate] = useState(new Date(start));
    const [endDate, setEndDate] = useState(new Date(end));
    const [pj, setPj] = useState({ title, desc });
    const dispatch = useDispatch();

    const onChange = (e) => {
        const { name, value } = e.target;
        setPj({ ...pj, [name]: value });
        const key = name === 'title' ? 'title' : 'desc';
        dispatch(setCache({ pid, key, value }));
    };

    const changeStartDate = (date) => {
        setStartDate(date);
        dispatch(setCache({ pid, key: 'start_date', value: date.toString() }));
    };

    const changeEndDate = (date) => {
        setEndDate(date);
        dispatch(setCache({ pid, key: 'end_date', value: date.toString() }));
    };

    const onDelete = () => dispatch(deleteProject({ uid, id: pid }));

    const [s, e] = [getDate(startDate), getDate(endDate)];
    const dateOutput =
        s && e ? `${s} - ${e}` : !s ? `${e} - ${e}` : `${s} - ${s}`;

    return (
        <Form
            md={12}
            style={{
                margin: '20px 0px',
                textAlign: 'center',
                padding: '10px 10px',
            }}
        >
            {mode !== 2 ? (
                <div>
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
                </div>
            ) : (
                <UpdateForm>
                    <>
                        <h3>
                            <Form.Control
                                md={'mb-6'}
                                type="text"
                                placeholder="프로젝트명"
                                name="title"
                                value={pj.title}
                                onChange={onChange}
                            />
                        </h3>
                        <div style={{ margin: '10px 0px' }}>
                            <FormControl
                                as="textarea"
                                aria-label="With textarea"
                                md={'mb-6'}
                                placeholder="프로젝트 상세내용"
                                name="desc"
                                value={pj.desc}
                                onChange={onChange}
                            />
                        </div>
                        <Row style={{ margin: '20px 0px' }}>
                            <Col>
                                <Form.Label>프로젝트 시작일</Form.Label>
                                <DatePicker
                                    className="form-control"
                                    closeOnScroll={true}
                                    selected={startDate}
                                    onChange={changeStartDate}
                                    maxDate={endDate}
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
                                    onChange={changeEndDate}
                                    minDate={startDate}
                                />
                            </Col>
                        </Row>
                        <div className="icon">
                            {/* delete */}
                            <a style={aStyle} onClick={onDelete}>
                                <FontAwesomeIcon icon={faTrash} />
                            </a>
                        </div>
                    </>
                </UpdateForm>
            )}
        </Form>
    );
}

Project.propTypes = {
    uid: PropTypes.string,
    pid: PropTypes.number,
    mode: PropTypes.number,
    title: PropTypes.string,
    desc: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
};
export default Project;
