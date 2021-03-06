import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Certificate from '../../components/portfolio/Certificate';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faPen } from '@fortawesome/free-solid-svg-icons';
import {
    changeMode,
    createCertificate,
    readAllCertificate,
    updateCertificate,
} from '../../modules/certificate';

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

    const onClick = () => dispatch(changeMode(2));
    const addCert = () => dispatch(createCertificate({ uid }));
    const updateCert = () => {
        dispatch(updateCertificate({ uid, data: cache }));
        dispatch(changeMode(1));
    };
    useEffect(() => {
        if (uid === sessionStorage.getItem('id')) {
            dispatch(changeMode(1));
        } else {
            dispatch(changeMode(0));
        }
        if (!currentPage || uid != currentPage) {
            dispatch(readAllCertificate({ uid }));
        }
    }, [currentPage]);

    return (
        <div style={{ border: '1px solid rgba(0,0,0,.125)' }}>
            <h4>자격증</h4>
            {certificates.map((cert) => (
                <Certificate
                    key={cert.id}
                    uid={uid}
                    cid={cert.id}
                    mode={mode}
                    title={cert.title}
                    organization={cert.organization}
                    acquisitionDate={cert.acquisition_date}
                />
            ))}
            {mode === 1 ? (
                // Change Mode
                <Button variant="primary">
                    <FontAwesomeIcon icon={faPen} onClick={onClick} />
                </Button>
            ) : null}
            {mode === 2 ? (
                <>
                    {/* post */}
                    <Button variant="primary" onClick={addCert}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    {/* put */}
                    <Button variant="success" onClick={updateCert}>
                        <FontAwesomeIcon icon={faCheck} />
                    </Button>
                </>
            ) : null}
        </div>
    );
}

export default CertificateContainer;
