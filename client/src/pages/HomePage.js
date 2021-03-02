import React from 'react';
import PageTemplate from '../components/PageTemplate';
import NavBar from '../containers/auth/NavBar';

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
            </PageTemplate>
        </>
    );
}

export default HomePage;
