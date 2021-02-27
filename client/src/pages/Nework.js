import React from 'react';
// import { CardDeck } from 'react-bootstrap';
import PageTemplate from '../components/PageTemplate';
// import Profile from '../components/network/Profile';
// import SearchBar from '../components/network/SearchBar';
// import SearchError from '../components/network/SearchError';
import ProfileContainer from '../containers/network/ProfileContainer';

function Network() {
    return (
        <PageTemplate>
            <ProfileContainer />
        </PageTemplate>
    );
}

export default Network;
