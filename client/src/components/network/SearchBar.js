import React from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function SearchBar() {
    return (
        <Form style={{ marginTop: '30px', marginBottom: '70px' }} className="col-md-12">
            <Form.Group controlId="formBasicEmail">
                <InputGroup className="">
                    <Form.Control type="text" placeholder="이름으로 검색" />
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

export default SearchBar;
