import React from 'react';
import PageTemplate from '../components/PageTemplate';
import Education from '../components/portfolio/Education';
import PortfolioContainer from '../containers/portfolio/PortfolioContainer';

function Portfolio() {
    return (
        <PageTemplate>
            <>
                <PortfolioContainer />
                <Education />
            </>
        </PageTemplate>
    );
}

export default Portfolio;
