import React from 'react';
import Profile from '../components/network/Profile';
import PageTemplate from '../components/PageTemplate';
import Education from '../components/portfolio/Education';

function Portfolio() {
    return (
        <PageTemplate>
            <Profile mode='read' />
            <Education />
        </PageTemplate>
    );
}

export default Portfolio;
