import React from 'react';
import Footer from '../components/Footer';
// import { CardDeck } from 'react-bootstrap';
import PageTemplate from '../components/PageTemplate';
import NavBar from '../containers/auth/NavBar';
// import Profile from '../components/network/Profile';
// import SearchBar from '../components/network/SearchBar';
// import SearchError from '../components/network/SearchError';
import ProfileContainer from '../containers/network/ProfileContainer';

function Network() {
    return (
        <>
            <PageTemplate>
                <>
                    <NavBar />
                    <ProfileContainer />
                </>
                <Footer />
            </PageTemplate>
        </>
    );
}

export default Network;
