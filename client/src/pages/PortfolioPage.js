import React from 'react';
import PageTemplate from '../components/PageTemplate';
import NavBar from '../containers/auth/NavBar';
import AwardsContainer from '../containers/portfolio/AwardsContainer';
import CertificateContainer from '../containers/portfolio/CertificateContainer';
import EducationContainer from '../containers/portfolio/EducationContainer';
import ProfileContainer from '../containers/portfolio/ProfileContainer';
import ProjectContainer from '../containers/portfolio/ProjectContainer';

function Portfolio() {
    return (
        <PageTemplate>
            <>
                <NavBar />
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
