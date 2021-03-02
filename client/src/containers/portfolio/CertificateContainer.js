import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as API from '../../lib/apis/portfolio';
import Certificate from '../../components/portfolio/Certificate';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faPen } from '@fortawesome/free-solid-svg-icons';

function CertificateContainer() {
    const location = useLocation().pathname.split('/');
    const [mode, setMode] = useState(0);
    const [certTuples, setCertTuples] = useState([]);
    const [cert, setCert] = useState([]);
    const [status, setStatus] = useState(false);
    const onClick = () => setMode(2);
    const addEdu = () => {
        API.postEdu(location[location.length - 1]).then((res) => {
            console.log(res.data);
            const payload = {
                id: res.data.result.id,
                school: '',
                major: '',
                status: 'attending',
            };
            setCertTuples([...certTuples, payload]);
            setCert([
                ...cert,
                <Certificate
                    mode={mode}
                    key={payload.id}
                    school={payload.school}
                    major={payload.major}
                    status={payload.status}
                />,
            ]);
        });
    };
    // const onSubmit = (e) => {
    //     e.prventDefault();
    //     console.log(e.target);
    // };
    useEffect(() => {
        if (location[location.length - 1] === sessionStorage.getItem('id')) {
            setMode(1);
        } else {
            setMode(0);
        }
        if (!status) {
            API.getAllEdu(location[location.length - 1]).then((res) => {
                console.log(res.data.data);
                const payload = res.data.data;
                setCertTuples(
                    payload.map((v) => ({
                        id: v.id,
                        school: v.school_name,
                        major: v.major,
                        status: v.status,
                    })),
                );
                if (payload.length === 1) {
                    // 등록된 데이터가 기본값밖에 없으면 출력
                    if (!payload[0].school_name && !payload[0].major)
                        setCert([
                            <Certificate
                                mode={0}
                                key={0}
                                school="학력 정보가 없습니다"
                                major="전공 정보"
                                status=""
                            />,
                        ]);
                } else {
                    setCert(
                        payload.map((v) => (
                            <Certificate
                                mode={mode}
                                key={v.id}
                                school={v.school_name}
                                major={v.major}
                                status={v.status}
                                addEdu={addEdu}
                            />
                        )),
                    );
                }
                setStatus(true);
            });
        }
    }, [status]);
    return (
        <div style={{ border: '1px solid rgba(0,0,0,.125)' }}>
            <h4>자격증</h4>
            {/* {cert} */}
            <Certificate mode={mode} />
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

export default CertificateContainer;
