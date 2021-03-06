import React from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import PropType from 'prop-types';

function SearchBar({ search, onChange, onSubmit }) {
    return (
        <Form
            style={{ marginTop: '30px', marginBottom: '70px', padding: '0px' }}
            className="col-md-12"
            onSubmit={onSubmit}
        >
            <Form.Group controlId="formBasicEmail">
                <InputGroup className="">
                    <Form.Control
                        type="text"
                        placeholder="이름으로 검색"
                        name="search"
                        value={search}
                        onChange={onChange}
                    />
                    {/* <Form.Text className="text-muted">
                    </Form.Text> */}
                    <InputGroup.Append>
                        <Button variant="primary" type="submit">
                            <FontAwesomeIcon icon={faSearch} />
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form.Group>
        </Form>
    );
}

SearchBar.propTypes = {
    search: PropType.string,
    onChange: PropType.func,
    onSubmit: PropType.func,
};
export default SearchBar;
