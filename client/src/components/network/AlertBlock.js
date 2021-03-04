import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

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
