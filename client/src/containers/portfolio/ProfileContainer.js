import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Profile from '../../components/network/Profile';
import { useLocation } from 'react-router-dom';
import { readProfile, changeMode, updateProfile } from '../../modules/profile';
// import { getUser } from '../../modules/auth';

function ProfileContainer() {
    // 프로필 정보 가져오기
    const uid = useLocation().pathname.split('/').at(-1);
    const { mode, profile } = useSelector(({ profile }) => ({
        mode: profile.mode,
        profile: profile.profile,
        currentPage: profile.currentPage,
    }));

    const dispatch = useDispatch();

    const [pf, setPf] = useState({
        user_name: profile.user_name,
        comment: profile.comment,
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setPf({ ...pf, [name]: value });
    };

    const setMode = () => {
        dispatch(changeMode(3));
        setPf({ user_name: profile.user_name, comment: profile.comment });
    };

    const updatePro = (data) => {
        dispatch(updateProfile(data));
        dispatch(changeMode(2));
        setPf({ user_name: profile.user_name, comment: profile.comment });
    };

    const updateImg = (e) => {
        if (e.target.files) {
            const req = new FormData();
            req.append('file', e.target.files[0]);
            dispatch(updateProfile({ uid, data: req }));
        }
    };

    useEffect(() => {
        if (uid === sessionStorage.getItem('id')) {
            dispatch(changeMode(2));
        } else {
            dispatch(changeMode(1));
        }
        dispatch(readProfile({ uid }));
    }, []);

    return (
        <>
            <div style={{ border: '1px solid rgba(0,0,0,.125)' }}>
                <Profile
                    uid={uid}
                    mode={mode}
                    imgUrl={profile.img_url}
                    name={profile.user_name}
                    comment={profile.comment}
                    changeMode={setMode}
                    updatePro={updatePro}
                    updateImg={updateImg}
                    pf={pf}
                    onChange={onChange}
                />
            </div>
        </>
    );
}

export default ProfileContainer;
