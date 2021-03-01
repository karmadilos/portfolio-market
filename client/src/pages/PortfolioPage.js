import React from 'react';
import PageTemplate from '../components/PageTemplate';
import AwardsContainer from '../containers/portfolio/AwardsContainer';
import CertificateContainer from '../containers/portfolio/CertificateContainer';
import EducationContainer from '../containers/portfolio/EducationContainer';
import ProfileContainer from '../containers/portfolio/ProfileContainer';
import ProjectContainer from '../containers/portfolio/ProjectContainer';

function Portfolio() {
    return (
        <PageTemplate>
            <>
                <ProfileContainer />
                <EducationContainer />
                <AwardsContainer />
                <ProjectContainer />
                <CertificateContainer />
            </>
        </PageTemplate>
    );
}

export default Portfolio;
