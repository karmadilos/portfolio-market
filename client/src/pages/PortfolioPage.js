import React from 'react';
import PageTemplate from '../components/PageTemplate';
import NavBar from '../containers/auth/NavBar';
import AwardsContainer from '../containers/portfolio/AwardsContainer';
import CertificateContainer from '../containers/portfolio/CertificateContainer';
import EducationContainer from '../containers/portfolio/EducationContainer';
import ProfileContainer from '../containers/portfolio/ProfileContainer';
import ProjectContainer from '../containers/portfolio/ProjectContainer';
import { Col, Row } from 'react-bootstrap';
import Footer from '../components/Footer';

function Portfolio() {
    return (
        <PageTemplate>
            <>
                <NavBar />
                <Row>
                    <Col>
                        <ProfileContainer />
                    </Col>
                    <Col md={8}>
                        <EducationContainer />
                        <AwardsContainer />
                        <ProjectContainer />
                        <CertificateContainer />
                    </Col>
                </Row>
                <Footer />
            </>
        </PageTemplate>
    );
}

export default Portfolio;
