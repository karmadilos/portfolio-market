import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Certificate from '../../components/portfolio/Certificate';
import { Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faPen } from '@fortawesome/free-solid-svg-icons';
import {
    changeMode,
    createCertificate,
    readAllCertificate,
    setError,
    updateCertificate,
} from '../../modules/certificate';

// 자격증 정보를 주고받는 Container 컴포넌트
function CertificateContainer() {
    const uid = useLocation().pathname.split('/').at(-1);
    // eslint-disable-next-line no-unused-vars
    const { mode, certificates, cache, error, currentPage } = useSelector(
        ({ certificate }) => ({
            mode: certificate.mode,
            status: certificate.status,
            certificates: certificate.certificates,
            cache: certificate.cache,
            error: certificate.error,
        }),
    );
    const dispatch = useDispatch();

    // 하위 컴포넌트에 전달될 이벤트 함수
    const onClick = () => dispatch(changeMode(2));
    const addCert = () => dispatch(createCertificate({ uid }));
    const updateCert = () => {
        for (let cert of cache) {
            console.log(cert);
            for (let v of Object.values(cert)) {
                if (!v) {
                    dispatch(setError('빈 값이 올 수 없습니다.'));
                    return;
                }
            }
        }
        dispatch(updateCertificate({ uid, data: cache }));
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
            dispatch(readAllCertificate({ uid }));
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
            <h4 className="title">자격증</h4>
            {certificates.length > 0
                ? certificates.map((cert) => (
                      <Certificate
                          key={cert.id}
                          uid={uid}
                          cid={cert.id}
                          mode={mode}
                          title={cert.title}
                          organization={cert.organization}
                          acquisitionDate={cert.acquisition_date}
                      />
                  ))
                : '항목이 비었습니다'}
            {error ? <Alert variant="warning">{error}</Alert> : null}
            {mode === 1 ? (
                // Change Mode
                <div style={{ textAlign: 'right' }}>
                    <Button variant="primary">
                        <FontAwesomeIcon icon={faPen} onClick={onClick} />
                    </Button>
                </div>
            ) : null}
            {mode === 2 ? (
                <div style={{ textAlign: 'right' }}>
                    {/* post */}
                    <Button
                        variant="primary"
                        onClick={addCert}
                        className="plus-btn"
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    {/* put */}
                    <Button
                        variant="success"
                        onClick={updateCert}
                        className="plus-btn"
                    >
                        <FontAwesomeIcon icon={faCheck} />
                    </Button>
                </div>
            ) : null}
        </div>
    );
}

export default CertificateContainer;
