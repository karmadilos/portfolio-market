import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteAwards, setCache } from '../../modules/awards';
import { Form } from 'react-bootstrap';
import UpdateForm from './UpdateForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Awards({ uid, aid, mode, awardTitle, awardDesc }) {
    const aStyle = {
        opacity: '0.5',
        fontSize: '1.3rem',
    };
    const dispatch = useDispatch();
    const [awd, setAwd] = useState({
        awardTitle: awardTitle,
        awardDesc: awardDesc,
    });
    const onChange = (e) => {
        const { name, value } = e.target;
        setAwd({ ...awd, [name]: value });
        const key = name === 'awardTitle' ? 'award_title' : 'award_desc';
        dispatch(setCache({ aid, key, value }));
    };
    const onDelete = () => dispatch(deleteAwards({ uid, id: aid }));
    // if (!awardTitle && !awardDesc) return <></>;
    return (
        <Form
            md={12}
            style={{
                margin: '20px 0px',
                textAlign: 'center',
                padding: '10px 10px',
            }}
        >
            {mode !== 2 ? (
                <>
                    <h3>{'수상 정보' && awardTitle}</h3>
                    <p>{'수상 상세내용' && awardDesc}</p>
                </>
            ) : (
                <UpdateForm>
                    <>
                        <h3>
                            <Form.Control
                                md={'mb-6'}
                                type="text"
                                placeholder="수상명"
                                name="awardTitle"
                                value={awd.awardTitle}
                                onChange={onChange}
                            />
                        </h3>
                        <div style={{ margin: '10px 0px' }}>
                            <Form.Control
                                md={'mb-6'}
                                type="text"
                                placeholder="수상 상세내용"
                                name="awardDesc"
                                value={awd.awardDesc}
                                onChange={onChange}
                            />
                        </div>
                        <div>
                            <a style={aStyle}>
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    onClick={onDelete}
                                />
                            </a>
                        </div>
                    </>
                </UpdateForm>
            )}
        </Form>
    );
}

Awards.propTypes = {
    uid: PropTypes.string,
    aid: PropTypes.number,
    mode: PropTypes.number,
    awardTitle: PropTypes.string,
    awardDesc: PropTypes.string,
};
export default Awards;
