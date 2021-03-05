import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Project from '../../components/portfolio/Project';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faPen } from '@fortawesome/free-solid-svg-icons';
import {
    changeMode,
    createProject,
    readAllProject,
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
        dispatch(updateProject({ uid, data: cache }));
        dispatch(changeMode(1));
    };
    useEffect(() => {
        console.log(uid, sessionStorage.getItem('id'));
        if (uid === sessionStorage.getItem('id')) {
            dispatch(changeMode(1));
        } else {
            dispatch(changeMode(0));
        }
        if (!currentPage || uid != currentPage) {
            dispatch(readAllProject({ uid }));
        }
    }, [currentPage]);
    return (
        <div style={{ border: '1px solid rgba(0,0,0,.125)' }}>
            <h4>프로젝트</h4>
            {projects.map((pj) => (
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
            ))}
            {mode === 1 ? (
                <Button variant="primary" onClick={setMode}>
                    <FontAwesomeIcon icon={faPen} />
                </Button>
            ) : null}
            {mode === 2 ? (
                <>
                    {/* post */}
                    <Button variant="primary" onClick={addPj}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    {/* put */}
                    <Button variant="success" onClick={updatePj}>
                        <FontAwesomeIcon icon={faCheck} />
                    </Button>
                </>
            ) : null}
        </div>
    );
}

export default ProjectContainer;
