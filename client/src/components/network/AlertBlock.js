import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

// 검색을 2글자 이상으로 하지 않았을 떄 렌더링 될 모달 창
function AlertBlock({ message, setErrMsg, setSearch }) {
    if (message) {
        return (
            <Alert
                style={{
                    position: 'absolute',
                    top: '40px',
                    left: '10%',
                    width: '80%',
                    zIndex: '10',
                }}
                variant="danger"
                onClose={() => {
                    setErrMsg(null);
                    setSearch('');
                }}
                dismissible
            >
                <Alert.Heading>
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                </Alert.Heading>
                <p>{message}</p>
            </Alert>
        );
    }
    return <></>;
}

AlertBlock.propTypes = {
    message: PropTypes.string,
    setErrMsg: PropTypes.func,
    setSearch: PropTypes.func,
};
export default AlertBlock;
