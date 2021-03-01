import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as API from '../../lib/apis/portfolio';
import Project from '../../components/portfolio/Project';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faPen } from '@fortawesome/free-solid-svg-icons';

function ProjectContainer() {
    const [pjTuples, setPjTuples] = useState([]);
    const [pj, setPj] = useState([]);
    const [status, setStatus] = useState(false);
    const location = useLocation().pathname.split('/');
    const addEdu = () => {
        API.postEdu(location[location.length - 1]).then((res) => {
            console.log(res.data);
            const payload = {
                id: res.data.result.id,
                school: '',
                major: '',
                status: 'attending',
            };
            setPjTuples([...pjTuples, payload]);
            setPj([
                ...pj,
                <Project
                    mode={0}
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
        console.log(location[location.length - 1]);
        if (!status) {
            API.getAllEdu(location[location.length - 1]).then((res) => {
                console.log(res.data.data);
                const payload = res.data.data;
                setPjTuples(
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
                        setPj([
                            <Project
                                mode={0}
                                key={0}
                                school="학력 정보가 없습니다"
                                major="전공 정보"
                                status=""
                            />,
                        ]);
                } else {
                    setPj(
                        payload.map((v) => (
                            <Project
                                mProject
                                key={v.id}
                                school={v.school_name}
                                major={v.major}
                                status={v.status}
                                eduTuples={pjTuples}
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
            <h4>프로젝트</h4>
            <Project mode={1} />
            {/* {pj} */}
            <Button variant="primary">
                <FontAwesomeIcon icon={faPen} />
            </Button>
            <Button variant="primary" onClick={addEdu}>
                <FontAwesomeIcon icon={faPlus} />
            </Button>
            <Button variant="success">
                <FontAwesomeIcon icon={faCheck} />
            </Button>
        </div>
    );
}

export default ProjectContainer;
