import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    changeMode,
    createEducation,
    readAllEducations,
    setError,
    updateEducation,
} from '../../modules/education';
import Education from '../../components/portfolio/Education';
import { Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faPen } from '@fortawesome/free-solid-svg-icons';

function EducationContainer() {
    // uid = 현재 포트폴리오 사이트의 userID
    const uid = useLocation().pathname.split('/').at(-1);
    const dispatch = useDispatch();
    // eslint-disable-next-line no-unused-vars
    const { mode, educations, error, cache, currentPage } = useSelector(
        ({ education }) => ({
            mode: education.mode,
            educations: education.educations,
            error: education.error,
            cache: education.cache,
            status: education.status,
        }),
    );

    // 하위 컴포넌트에 전달될 이벤트 함수
    const setMode = () => dispatch(changeMode(2));
    const addEdu = () => dispatch(createEducation({ uid }));
    const updateEdu = () => {
        for (let edu of cache) {
            for (let v of Object.values(edu)) {
                if (!v) {
                    dispatch(setError('빈 값이 올 수 없습니다.'));
                    return;
                }
            }
        }
        dispatch(updateEducation({ uid, data: cache }));
        dispatch(changeMode(1));
    };

    useEffect(() => {
        // 현재 접속한 포트폴리오 페이지의 userid가 현재 접속한 사용자와 같으면 1,
        // 다르면 0으로 모드를 전환시킨다.
        if (uid === sessionStorage.getItem('id')) {
            dispatch(changeMode(1));
        } else {
            dispatch(changeMode(0));
        }
        if (!currentPage || uid != currentPage) {
            dispatch(readAllEducations({ uid }));
        }
    }, [currentPage]); // 사용자 페이지가 바뀔 때마다, 사용자 정보를 호출한다.
    return (
        <div
            style={{
                border: '1px solid rgba(0,0,0,.125)',
                marginBottom: '10px',
                textAlign: 'center',
            }}
        >
            <h4 className="title">학력</h4>
            {educations.length > 0
                ? educations.map((edu) => (
                      <Education
                          key={edu.id}
                          eid={edu.id}
                          uid={uid}
                          school={edu.school_name}
                          major={edu.major}
                          status={edu.status}
                      />
                  ))
                : '항목이 비었습니다'}
            {error ? <Alert variant="warning">{error}</Alert> : null}
            {mode === 1 ? (
                // change mode
                <div style={{ textAlign: 'right' }}>
                    <Button variant="primary">
                        <FontAwesomeIcon icon={faPen} onClick={setMode} />
                    </Button>
                </div>
            ) : null}
            {mode === 2 ? (
                <div style={{ textAlign: 'right' }}>
                    {/* post */}
                    <Button
                        variant="primary"
                        onClick={addEdu}
                        className="plus-btn"
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    {/* put */}
                    <Button variant="success" className="plus-btn">
                        <FontAwesomeIcon icon={faCheck} onClick={updateEdu} />
                    </Button>
                </div>
            ) : null}
        </div>
    );
}

export default EducationContainer;
