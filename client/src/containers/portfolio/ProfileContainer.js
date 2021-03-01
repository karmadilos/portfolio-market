import React, { useEffect, useState } from 'react';
import Profile from '../../components/network/Profile';
import { useLocation } from 'react-router-dom';
import { getProfile } from '../../lib/apis/profile';

function ProfileContainer() {
    // 프로필 정보 가져오기
    const location = useLocation().pathname.split('/');
    const [profile, setProfile] = useState(null);
    const onClick = (e) => {
        console.log(e.target.id);
        // 수정 버튼 누르면, 수정 Form에 state(cache)에 저장한 현재 내용 전달해 렌더링하기
    };
    useEffect(() => {
        console.log(location[location.length - 1]);
        if (!profile) {
            getProfile(location[location.length - 1]).then((res) => {
                // mode, imgurl, name, comment
                // 현재 접속한 user와 같은 사람인지 확인 후 같으면 mode=1 다르면 mode=0
                const payload = res.data.data.map((v) => (
                    <Profile
                        key={v.user_id}
                        id={v.user_id}
                        mode={1}
                        imgurl={v.img_url}
                        name={v.user_name}
                        comment={v.comment}
                        onClick={onClick}
                    />
                ));
                setProfile(payload);
                console.log(payload);
            });
        }
    }, [profile]);
    return (
        <>
            <div style={{ border: '1px solid rgba(0,0,0,.125)' }}>
                {profile}
            </div>
        </>
    );
}

export default ProfileContainer;
