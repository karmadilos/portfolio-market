import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteCertificate, setCache } from '../../modules/certificate';
import { getDate } from '../../lib/getDate';
import { Form, Row, Col } from 'react-bootstrap';
import UpdateForm from './UpdateForm';
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const aStyle = {
    opacity: '0.5',
    fontSize: '1.3rem',
};

// 자격증 정보가 표시되는 컴포넌트
function Certificate({ uid, cid, mode, title, organization, acquisitionDate }) {
    console.log(typeof acquisitionDate);
    const [aqDate, setAqDate] = useState(new Date(acquisitionDate));
    const [cert, setCert] = useState({ title, organization });
    const dispatch = useDispatch();

    const updateAqDate = (date) => {
        setAqDate(date);
        dispatch(
            setCache({ cid, key: 'acquisition_date', value: date.toString() }),
        );
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setCert({ ...cert, [name]: value });
        const key = name === 'title' ? 'title' : 'organization';
        dispatch(setCache({ cid, key, value }));
    };

    const onDelete = () => dispatch(deleteCertificate({ uid, id: cid }));

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
                <>
                    <h3>{title ? title : '자격증 명칭'}</h3>
                    <h5>{organization ? organization : '자격증 발급처'}</h5>
                    <p style={{ color: 'gray' }}>{`SINCE ${getDate(
                        aqDate,
                    )}`}</p>
                </>
            ) : (
                <UpdateForm>
                    <>
                        <h3>
                            <Form.Control
                                md={'mb-6'}
                                type="text"
                                placeholder="자격증 명칭"
                                name="title"
                                value={cert.title}
                                onChange={onChange}
                            />
                        </h3>
                        <div style={{ margin: '10px 0px' }}>
                            <Form.Control
                                md={'mb-6'}
                                type="text"
                                placeholder="자격증 발급처"
                                name="organization"
                                value={cert.organization}
                                onChange={onChange}
                            />
                        </div>
                        {/* date picker 1개 */}
                        <Row style={{ margin: '20px 0px' }}>
                            <Col>
                                <Form.Label>자격증 취득일 &nbsp;</Form.Label>
                                <DatePicker
                                    className="form-control"
                                    closeOnScroll={true}
                                    selected={aqDate}
                                    onChange={updateAqDate}
                                />
                            </Col>
                        </Row>
                        <div className="icon">
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

Certificate.propTypes = {
    uid: PropTypes.string,
    cid: PropTypes.number,
    mode: PropTypes.number,
    title: PropTypes.string,
    organization: PropTypes.string,
    acquisitionDate: PropTypes.string,
};
export default Certificate;
