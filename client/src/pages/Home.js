import React from 'react';
import HomeContainer from '../containers/auth/HomeContainer';
import { getCookie } from '../lib/apis/client';

function Home() {
    console.log(getCookie('csrf_access_token'))
    return (
        <HomeContainer auth={getCookie('csrf_access_token')} />
    );
}

export default Home;
