import React from 'react';
import PropTypes from 'prop-types';

function EducationView({ school, major, status }) {
    // 학력정보인, 학교이름/전공/현재상태를 Education가져와 출력
    const map = {
        attending: '재학중',
        bachelor: '학사',
        master: '석사',
        doctor: '박사',
    };
    const eState = map[status] ? `(${map[status]})` : '(학력 상태)';
    return (
        <div>
            <h3>{'학력사항을 추가하세요' && school}</h3>
            <p>
                {'전공' && major}
                <span>{eState}</span>
            </p>
        </div>
    );
}

EducationView.propTypes = {
    school: PropTypes.string,
    major: PropTypes.string,
    status: PropTypes.string,
};
export default EducationView;
