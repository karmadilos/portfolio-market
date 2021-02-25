import React from 'react';
import { CardDeck } from 'react-bootstrap';
import PageTemplate from '../components/PageTemplate';
import Profile from '../components/network/Profile';
import SearchBar from '../components/network/SearchBar';
import SearchError from '../components/network/SearchError';

function Network() {
    return (
        <PageTemplate>
            <SearchBar />
            {/* axios로 비동기 통신을 통하여 map으로 렌더링 예정 */}
            <CardDeck className="col-md-12">
                <Profile imgurl='' comment='' />
                <Profile imgurl='' comment='' />
                <Profile imgurl='' comment='' />
            </CardDeck>
            <SearchError />
        </PageTemplate>
    );
}

export default Network;
