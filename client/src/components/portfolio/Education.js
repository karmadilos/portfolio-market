import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import EducationUpdate from './EducationUpdate';
import { setCache, deleteEducation } from '../../modules/education';

// 일반 보기 모드(0, 1) : 전달받은 내용을 출력
// 수정모드(2) : 전달받은 내용을 form value로 전달
const map = {
    attending: '재학중',
    bachelor: '학사',
    master: '석사',
    doctor: '박사',
};

// 학력 정보를 표시하는 컴포넌트
function Education({ eid, uid, school, major, status }) {
    const { mode } = useSelector(({ education }) => ({
        mode: education.mode,
        cache: education.cache,
    }));
    const dispatch = useDispatch();
    const [check, setCheck] = useState(status);
    const [education, setEducation] = useState({
        school: school,
        major: major,
    });
    const onClick = (e) => {
        console.log(e.target);
        setCheck(e.target.id);
        dispatch(setCache({ eid, key: 'status', value: e.target.id }));
    };
    const onChange = (e) => {
        const { name, value } = e.target;
        const key = name === 'school' ? 'school_name' : name;
        setEducation({ ...education, [name]: value });
        console.log(education);
        dispatch(setCache({ eid, key, value }));
    };
    const onDelete = () => dispatch(deleteEducation({ uid, id: eid }));
    const eState = map[status] ? `(${map[status]})` : '(학력 상태)';
    // mode가 0,1 이면 view, mode가 2이면 update
    // if (!school && !major) return <></>;
    return (
        <Form
            md={12}
            style={{
                margin: '20px 0px',
                textAlign: 'center',
                padding: '0px 0px',
            }}
        >
            {mode !== 2 ? (
                <div>
                    <h3>{school || '학력 정보'}</h3>
                    <p>
                        {major || '전공'}
                        <span>{eState}</span>
                    </p>
                </div>
            ) : (
                <EducationUpdate
                    check={check}
                    edu={education}
                    onClick={onClick}
                    onChange={onChange}
                    onDelete={onDelete}
                />
            )}
        </Form>
    );
}

Education.propTypes = {
    // mode: PropTypes.number,
    school: PropTypes.string,
    major: PropTypes.string,
    status: PropTypes.string,
    // onSubmit: PropTypes.func,
    // addEdu: PropTypes.func,
    eid: PropTypes.number,
    uid: PropTypes.string,
};

export default Education;
