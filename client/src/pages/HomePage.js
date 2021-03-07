import React from 'react';
import PageTemplate from '../components/PageTemplate';
import NavBar from '../containers/auth/NavBar';
import Footer from '../components/Footer';

function HomePage() {
    return (
        <>
            <NavBar />
            <PageTemplate>
                <>
                    <div style={{ textAlign: 'center' }}>
                        <h2>Portfolio App</h2>
                        DEMO SITE
                    </div>
                </>
                <Footer />
            </PageTemplate>
        </>
    );
}

export default HomePage;
