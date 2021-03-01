import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import EducationUpdate from './EducationUpdate';

// 여기에 tuples 배열 전달해서 onChange할때, 같이 변화시키기.(index, user_id, id값 전달 필요)
function Education({ mode, school, major, status, onSubmit }) {
    const [check, setCheck] = useState(status);
    const [education, setEducation] = useState({
        school: school,
        major: major,
    });
    const onClick = (e) => {
        console.log(e.target);
        setCheck(e.target.id);
    };
    const onChange = (e) => {
        const { name, value } = e.target;
        setEducation({ ...education, [name]: value });
        console.log(education);
    };
    const map = {
        attending: '재학중',
        bachelor: '학사',
        master: '석사',
        doctor: '박사',
    };
    const eState = map[status] ? `(${map[status]})` : '(학력 상태)';
    // mode가 0이면 view, mode가 1이면 update
    return (
        <Form
            md={12}
            onSubmit={onSubmit}
            style={{
                margin: '20px 0px',
                textAlign: 'center',
                padding: '10px 10px',
            }}
        >
            {mode === 0 ? (
                school &&
                major && (
                    <div>
                        <h3>{'학력사항을 추가하세요' && school}</h3>
                        <p>
                            {'전공' && major}
                            <span>{eState}</span>
                        </p>
                    </div>
                )
            ) : (
                <EducationUpdate
                    check={check}
                    edu={education}
                    onClick={onClick}
                    onChange={onChange}
                />
            )}
        </Form>
    );
}

Education.propTypes = {
    mode: PropTypes.number,
    school: PropTypes.string,
    major: PropTypes.string,
    status: PropTypes.string,
    onSubmit: PropTypes.func,
    addEdu: PropTypes.func,
};

export default Education;
