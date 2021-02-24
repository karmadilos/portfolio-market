import React from 'react';
import PropsTypes from 'prop-types';
import { Link } from 'react-router-dom';
const style = {
    margin: '10px',
}
function Nav({ url, name, type, onClick }) {
    if (type !== "logout") {
        return <Link to={url} style={style} >{name}</Link>
    }
    return (
        <a href="" style={style} onClick={onClick}>{name}</a>
    );
}

Nav.propTypes = {
    url: PropsTypes.string,
    name: PropsTypes.string,
    type: PropsTypes.string,
    onClick: PropsTypes.func
}

export default Nav;
