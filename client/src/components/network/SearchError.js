import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

// 검색 결과가 없을 시 출력되는 컴포넌트
function SearchError() {
    const style = {
        margin: '20px 0px',
        textAlign: 'center',
    };
    return (
        <>
            <Row style={style}>
                <Col md={12}>
                    <FontAwesomeIcon
                        icon={faExclamationTriangle}
                        style={{ fontSize: '6rem' }}
                    />
                </Col>
            </Row>
            <h4 style={style}>검색결과가 없습니다.</h4>
        </>
    );
}

export default SearchError;
