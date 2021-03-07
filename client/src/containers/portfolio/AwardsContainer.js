import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import Awards from '../../components/portfolio/Awards';
import {
    changeMode,
    createAwards,
    readAllAwards,
    setError,
    updateAwards,
} from '../../modules/awards';

// 수상 정보를 주고받는 Container 컴포넌트
function AwardsContainer() {
    const uid = useLocation().pathname.split('/').at(-1);
    // eslint-disable-next-line no-unused-vars
    const { mode, awards, cache, error, currentPage } = useSelector(
        ({ awards }) => ({
            mode: awards.mode,
            status: awards.status,
            awards: awards.awards,
            cache: awards.cache,
            error: awards.error,
        }),
    );

    // 각각의 하위 컴포넌트에 전달할 이벤트 함수
    const dispatch = useDispatch();
    const setMode = () => dispatch(changeMode(2));
    const addAwd = () => dispatch(createAwards({ uid }));
    const updateAwd = () => {
        for (let awd of cache) {
            for (let v of Object.values(awd)) {
                if (!v) {
                    dispatch(setError('빈 값이 올 수 없습니다'));
                    return;
                }
            }
        }
        dispatch(updateAwards({ uid, data: cache }));
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
            dispatch(readAllAwards({ uid }));
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
            <h4 className="title">수상내역</h4>
            {awards.length > 0
                ? awards.map((awd) => (
                      <Awards
                          key={awd.id}
                          uid={uid}
                          aid={awd.id}
                          mode={mode}
                          awardTitle={awd.award_title}
                          awardDesc={awd.award_desc}
                      />
                  ))
                : '항목이 비었습니다'}
            {error ? <Alert variant="warning">{error}</Alert> : null}
            {mode === 1 ? (
                <div style={{ textAlign: 'right' }}>
                    <Button variant="primary">
                        <FontAwesomeIcon icon={faPen} onClick={setMode} />
                    </Button>
                </div>
            ) : null}
            {mode === 2 ? (
                <div style={{ textAlign: 'right' }}>
                    <Button variant="primary" onClick={addAwd}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    <Button variant="success" onClick={updateAwd}>
                        <FontAwesomeIcon icon={faCheck} />
                    </Button>
                </div>
            ) : null}
        </div>
    );
}

export default AwardsContainer;
