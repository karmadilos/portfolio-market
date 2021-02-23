import React from 'react';

function Home() {
    const navs = [
        { id: 1, name: 'Home', url: '/' },
        { id: 2, name: '네트워크', url: '/network' },
        { id: 3, name: '로그인', url: '/login' },
    ];
    return (
        <div>
            <h2>레이서 포트폴리오 서비스 입니다.</h2>
            {navs.map((nav) => (
                <li key={nav.id}>
                    <a href={nav.url}>{nav.name}</a>
                </li>
            ))}
        </div>
    );
}

export default Home;
