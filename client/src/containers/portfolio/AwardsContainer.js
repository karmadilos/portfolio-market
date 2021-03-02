import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import * as API from '../../lib/apis/portfolio';
import Awards from '../../components/portfolio/Awards';
import { useLocation } from 'react-router-dom';

function AwardsContainer() {
    const location = useLocation().pathname.split('/');
    const [mode, setMode] = useState(0);
    // const [awardsTuple, setAwardsTuple] = useState([]);
    const [status, setStatus] = useState(false);
    // const [awards, setAwards] = useState([]);
    const addAward = () => {
        API.postAwards();
    };
    // const updateAward = () => {};
    const onClick = () => setMode(2);
    useEffect(() => {
        setStatus(false);
        if (location[location.length - 1] === sessionStorage.getItem('id')) {
            setMode(1);
        }
    }, [status]);

    return (
        <div style={{ border: '1px solid rgba(0,0,0,.125)' }}>
            <h4>수상내역</h4>
            <Awards mode={mode} />
            {mode === 1 ? (
                <Button variant="primary">
                    <FontAwesomeIcon icon={faPen} onClick={onClick} />
                </Button>
            ) : null}
            {mode === 2 ? (
                <>
                    <Button variant="primary" onClick={addAward}>
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

export default AwardsContainer;
