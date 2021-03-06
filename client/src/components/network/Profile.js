import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons';

// 프로필 컴포넌트
// mode: view(network 전용, 0), read(portfolio 페이지 전용 - 사용자(1, 2)), update(portfolio 페이지 수정 전용,3)
function Profile({
    uid,
    mode,
    imgUrl,
    name,
    comment,
    changeMode,
    updatePro,
    updateImg,
    pf,
    onChange,
}) {
    const default_img_url =
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

    const buttons = [
        <Button key={0} variant="primary" href={`/portfolio/${uid}`}>
            정보 보기
        </Button>,
        null,
        <Button key={1} variant="primary" onClick={changeMode}>
            <FontAwesomeIcon icon={faPen} />
        </Button>,
        <Button
            key={2}
            variant="light"
            onClick={() => updatePro({ uid, data: pf })}
            style={{ color: '#ffffff' }}
        >
            <FontAwesomeIcon icon={faCheck} />
        </Button>,
    ];

    const imgComponent = (
        // <Card.Img
        //     src={imgUrl || default_img_url}
        //     alt="Card image"
        //     style={{ borderRadius: '50%', height: 'auto', width: '100%' }}
        //     variant="top"
        //     className="justify-content-md-center"
        // />
        <div
            style={{
                backgroundImage: `url(${imgUrl || default_img_url})`,
                backgroundSize: 'cover',
                height: '100%',
                width: '100%',
                borderRadius: '50%',
            }}
            className="justify-content-md-center"
        ></div>
    );

    const labelStyle = {
        cursor: 'pointer',
        display: 'block',
        width: '270px',
        height: 'auto',
        textAlign: 'center',
    };

    return (
        <Card
            style={
                mode !== 0
                    ? {
                          margin: '0 auto',
                          border: '1px solid gray',
                          height: 'inherit',
                      }
                    : {}
            }
            className={mode !== 0 ? 'col-md-12' : 'col'}
        >
            <Card.Header
                style={{
                    backgroundColor: '#fff',
                    borderBottom: '1px solid #fff',
                    width: '270px',
                    height: '270px',
                    margin: '0 auto',
                }}
                className="row"
            >
                {mode !== 2 ? (
                    imgComponent
                ) : (
                    <>
                        {/*[Reference] https://helloinyong.tistory.com/275 */}
                        <label
                            className="input-file-button"
                            htmlFor="input-file"
                            style={labelStyle}
                        >
                            {imgComponent}
                        </label>
                        <input
                            type="file"
                            id="input-file"
                            style={{ display: 'none' }}
                            accept="image/jpeg, image/jpg, image/png"
                            onChange={updateImg}
                        />
                    </>
                )}
            </Card.Header>
            <Card.Body style={{ textAlign: 'center' }}>
                <Card.Title>
                    {mode !== 3 ? (
                        name || 'NickName'
                    ) : (
                        <Form.Control
                            type="text"
                            placeholder="이름"
                            name="user_name"
                            value={pf.user_name}
                            onChange={onChange}
                        />
                    )}
                </Card.Title>
                <Card.Text>
                    {mode !== 3 ? (
                        comment || '한 줄 소개'
                    ) : (
                        <Form.Control
                            type="text"
                            placeholder="한 줄 소개"
                            name="comment"
                            value={pf.comment}
                            onChange={onChange}
                        />
                    )}
                </Card.Text>
                {buttons[mode]}
            </Card.Body>
        </Card>
    );
}

Profile.propTypes = {
    uid: PropTypes.string,
    mode: PropTypes.number,
    imgUrl: PropTypes.string,
    name: PropTypes.string,
    comment: PropTypes.string,
    changeMode: PropTypes.func,
    updatePro: PropTypes.func,
    updateImg: PropTypes.func,
    pf: PropTypes.object,
    onChange: PropTypes.func,
};

export default Profile;
