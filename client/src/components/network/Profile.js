import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons';

// mode: view(network 전용), read(portfolio 페이지 전용), update(portfolio 페이지 수정 전용)
function Profile({ id, mode, imgurl, name, comment, onClick }) {
  const default_img_url =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  const buttons = [
    (<Button key={0} variant="primary" id={id} onClick={onClick}>정보 보기</Button>),
    (<Button key={1} variant="primary"><FontAwesomeIcon icon={faPen} /></Button>),
    (<Button key={2} variant="light"><FontAwesomeIcon icon={faCheck} /></Button>)
  ]
  const imgComponent = (
    <Card.Img
      src={imgurl && default_img_url}
      alt="Card image"
      style={{ borderRadius: '50%' }}
    />
  );
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Header
        style={{
          backgroundColor: '#fff',
          borderBottom: '1px solid #fff',
          padding: '20px 20px',
        }}
      >
        {mode + '' !== 'update' ? imgComponent : <a>{imgComponent}</a>}
      </Card.Header>
      <Card.Body style={{ textAlign: 'center' }}>
        <Card.Title>
          {mode + '' !== 'update' ? (
            name || 'Noname'
          ) : (
              <Form.Control type="text" placeholder="이름" />
            )}
        </Card.Title>
        <Card.Text>
          {mode + '' !== 'update' ? (
            !comment && '한 줄 소개'
          ) : (
              <Form.Control type="text" placeholder="한 줄 소개" />
            )}
        </Card.Text>
        {buttons[mode]}
      </Card.Body>
    </Card>
  );
}

Profile.propTypes = {
  id: PropTypes.number,
  mode: PropTypes.number,
  imgurl: PropTypes.string,
  name: PropTypes.string,
  comment: PropTypes.string,
  onClick: PropTypes.func
};

export default Profile;
