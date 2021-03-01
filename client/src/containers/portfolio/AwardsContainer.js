import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import * as API from '../../lib/apis/portfolio';
import Awards from '../../components/portfolio/Awards';

function AwardsContainer() {
    // const [awardsTuple, setAwardsTuple] = useState([]);
    const [status, setStatus] = useState(false);
    // const [awards, setAwards] = useState([]);
    // const location = useLocation().pathname.split('/');
    const addAward = () => {
        API.postAwards();
    };
    // const updateAward = () => {};
    useEffect(() => {
        setStatus(false);
    }, [status]);
    return (
        <div style={{ border: '1px solid rgba(0,0,0,.125)' }}>
            <h4>수상내역</h4>
            <Awards mode={1} />
            <Button variant="primary">
                <FontAwesomeIcon icon={faPen} />
            </Button>
            <Button variant="primary" onClick={addAward}>
                <FontAwesomeIcon icon={faPlus} />
            </Button>
            <Button variant="success">
                <FontAwesomeIcon icon={faCheck} />
            </Button>
        </div>
    );
}

export default AwardsContainer;
