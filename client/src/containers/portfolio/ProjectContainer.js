import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Project from '../../components/portfolio/Project';
import { Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faPen } from '@fortawesome/free-solid-svg-icons';
import {
    changeMode,
    createProject,
    readAllProject,
    setError,
    updateProject,
} from '../../modules/project';

function ProjectContainer() {
    const uid = useLocation().pathname.split('/').at(-1);
    // eslint-disable-next-line no-unused-vars
    const { mode, projects, cache, error, currentPage } = useSelector(
        ({ project }) => ({
            mode: project.mode,
            status: project.status,
            projects: project.projects,
            cache: project.cache,
            error: project.error,
        }),
    );
    const dispatch = useDispatch();
    const setMode = () => dispatch(changeMode(2));
    const addPj = () => dispatch(createProject({ uid }));
    const updatePj = () => {
        for (let pj of cache) {
            for (let v of Object.values(pj)) {
                if (!v) {
                    dispatch(setError('빈 값이 올 수 없습니다'));
                    return;
                }
            }
        }
        dispatch(updateProject({ uid, data: cache }));
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
            dispatch(readAllProject({ uid }));
        }
    }, [currentPage]); // 사용자 페이지가 바뀔 때마다, 사용자 정보를 호출한다.
    return (
        <div
            style={{
                border: '1px solid rgba(0,0,0,.125)',
                margin: '10px 0px',
                textAlign: 'center',
            }}
        >
            <h4 className="title">프로젝트</h4>
            {projects.length > 0
                ? projects.map((pj) => (
                      <Project
                          key={pj.id}
                          uid={uid}
                          pid={pj.id}
                          mode={mode}
                          title={pj.title}
                          desc={pj.desc}
                          start={pj.start_date}
                          end={pj.end_date}
                      />
                  ))
                : '항목이 비었습니다'}
            {error ? <Alert variant="warning">{error}</Alert> : null}
            {mode === 1 ? (
                <div style={{ textAlign: 'right' }}>
                    <Button variant="primary" onClick={setMode}>
                        <FontAwesomeIcon icon={faPen} />
                    </Button>
                </div>
            ) : null}
            {mode === 2 ? (
                <div style={{ textAlign: 'right' }}>
                    {/* post */}
                    <Button
                        variant="primary"
                        onClick={addPj}
                        className="plus-btn"
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    {/* put */}
                    <Button
                        variant="success"
                        onClick={updatePj}
                        className="plus-btn"
                    >
                        <FontAwesomeIcon icon={faCheck} />
                    </Button>
                </div>
            ) : null}
        </div>
    );
}

export default ProjectContainer;
