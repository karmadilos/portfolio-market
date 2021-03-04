import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import Awards from '../../components/portfolio/Awards';
import {
    changeMode,
    createAwards,
    readAllAwards,
    updateAwards,
} from '../../modules/awards';

function AwardsContainer() {
    const uid = useLocation().pathname.split('/').at(-1);
    // eslint-disable-next-line no-unused-vars
    const { mode, status, awards, cache, error } = useSelector(
        ({ awards }) => ({
            mode: awards.mode,
            status: awards.status,
            awards: awards.awards,
            cache: awards.cache,
            error: awards.error,
        }),
    );
    const dispatch = useDispatch();
    const setMode = () => dispatch(changeMode(2));
    const addAwd = () => dispatch(createAwards({ uid }));
    const updateAwd = () => {
        dispatch(updateAwards({ uid, data: cache }));
        dispatch(changeMode(1));
    };
    useEffect(() => {
        if (uid === sessionStorage.getItem('id')) {
            dispatch(changeMode(1));
        } else {
            dispatch(changeMode(0));
        }
        if (!status) {
            dispatch(readAllAwards({ uid }));
        }
    }, [status]);

    return (
        <div style={{ border: '1px solid rgba(0,0,0,.125)' }}>
            <h4>수상내역</h4>
            {awards.map((awd) => (
                <Awards
                    key={awd.id}
                    uid={uid}
                    aid={awd.id}
                    mode={mode}
                    awardTitle={awd.award_title}
                    awardDesc={awd.award_desc}
                />
            ))}
            {mode === 1 ? (
                <Button variant="primary">
                    <FontAwesomeIcon icon={faPen} onClick={setMode} />
                </Button>
            ) : null}
            {mode === 2 ? (
                <>
                    <Button variant="primary" onClick={addAwd}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    <Button variant="success" onClick={updateAwd}>
                        <FontAwesomeIcon icon={faCheck} />
                    </Button>
                </>
            ) : null}
        </div>
    );
}

export default AwardsContainer;
