import React from 'react';
import HomeContainer from '../containers/auth/HomeContainer';

function Home() {
    console.log(window.sessionStorage['session'])
    return (
        <HomeContainer auth={window.sessionStorage['session']} />
    );
}

export default Home;
