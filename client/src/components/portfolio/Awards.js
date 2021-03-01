import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
// import AwardsUpdate from './AwardsUpdate';
import UpdateForm from './UpdateForm';

function Awards({ mode }) {
    return (
        <Form
            md={12}
            style={{
                margin: '20px 0px',
                textAlign: 'center',
                padding: '10px 10px',
            }}
        >
            {mode === 0 ? (
                <>
                    <h3>수상 정보</h3>
                    <p>수상 상세내용</p>
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
                            />
                        </h3>
                        <div style={{ margin: '10px 0px' }}>
                            <Form.Control
                                md={'mb-6'}
                                type="text"
                                placeholder="수상 상세내용"
                                name="awardDesc"
                            />
                        </div>
                    </>
                </UpdateForm>
            )}
        </Form>
    );
}

Awards.propTypes = {
    mode: PropTypes.number,
};
export default Awards;
