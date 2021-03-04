import React, { useState, useEffect } from 'react';
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
    const { mode, status, projects, cache, error } = useSelector(
        ({ project }) => ({
            mode: project.mode,
            status: project.mode,
            projects: project.projects,
            cache: project.cache,
            error: project.error,
        }),
    );
    const dispatch = useDispatch();
    const setMode = () => dispatch(changeMode(2));
    const addPj = () => dispatch(createProject(uid));
    const updatePj = () => dispatch(updateProject({ uid, data: cache }));
    useEffect(() => {
        if (uid === sessionStorage.getItem('id')) {
            dispatch(changeMode(1));
        } else {
            dispatch(changeMode(2));
        }
        if (!status) {
            dispatch(readAllProject(uid));
        }
    }, [status]);
    return (
        <div style={{ border: '1px solid rgba(0,0,0,.125)' }}>
            <h4>프로젝트</h4>
            <Project mode={mode} />
            {/* {pj} */}
            {mode === 1 ? (
                <Button variant="primary">
                    <FontAwesomeIcon icon={faPen} onClick={onClick} />
                </Button>
            ) : null}
            {mode === 2 ? (
                <>
                    <Button variant="primary" onClick={addEdu}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    <Button variant="success">
                        <FontAwesomeIcon icon={faCheck} />
                    </Button>
                </>
            ) : null}
        </div>
    );
}

export default ProjectContainer;
