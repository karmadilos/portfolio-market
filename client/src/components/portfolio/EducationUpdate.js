import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import UpdateForm from './UpdateForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// 학력 정보 수정을 누를 때 나타나는 Form 컴포넌트
function EducationUpdate({ check, edu, onClick, onChange, onDelete }) {
    // 학교이름, 전공, 현재 상태를 입력받는 폼 형태
    // 용도는
    // (1) 사용자가 수정버튼 눌렀을때, 현재 정보를 담아올 Component
    // (2) 사용자가 새로운 정보를 추가하고자 할 때, 추가버튼을 누르면 생성될 Component

    const inputStyle = {
        margin: '0px 10px',
    };
    const aStyle = {
        opacity: '0.5',
        fontSize: '1.3rem',
    };
    return (
        <UpdateForm>
            <>
                <h3>
                    <Form.Control
                        md={'mb-6'}
                        type="text"
                        placeholder="학교 이름"
                        name="school"
                        value={edu.school}
                        onChange={onChange}
                    />
                </h3>
                <Form.Control
                    type="text"
                    placeholder="전공"
                    name="major"
                    value={edu.major}
                    onChange={onChange}
                />
                <div style={{ margin: '10px 0px' }}>
                    <input
                        type="radio"
                        id="attending"
                        name="contact"
                        value="0"
                        defaultChecked={check === 'attending'}
                        onClick={onClick}
                        style={inputStyle}
                    />
                    {/* <label htmlFor="attending">재학중</label> */}
                    <label>재학중</label>
                    <input
                        type="radio"
                        id="bachelor"
                        name="contact"
                        value="1"
                        defaultChecked={check === 'bachelor'}
                        onClick={onClick}
                        style={inputStyle}
                    />
                    {/* <label htmlFor="bachelor">학사 졸업</label> */}
                    <label>학사 졸업</label>
                    <input
                        type="radio"
                        id="master"
                        name="contact"
                        value="2"
                        defaultChecked={check === 'master'}
                        onClick={onClick}
                        style={inputStyle}
                    />
                    {/* <label htmlFor="master">석사 졸업</label> */}
                    <label>석사 졸업</label>
                    <input
                        type="radio"
                        id="doctor"
                        name="contact"
                        value="3"
                        defaultChecked={check === 'doctor'}
                        onClick={onClick}
                        style={inputStyle}
                    />
                    {/* <label htmlFor="doctor">박사 졸업</label> */}
                    <label htmlFor="doctor">박사 졸업</label>
                </div>
                <div>
                    {/* delete */}
                    <a style={aStyle}>
                        <FontAwesomeIcon icon={faTrash} onClick={onDelete} />
                    </a>
                </div>
            </>
        </UpdateForm>
    );
}

EducationUpdate.propTypes = {
    check: PropTypes.string,
    edu: PropTypes.object,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onDelete: PropTypes.func,
};

export default EducationUpdate;
