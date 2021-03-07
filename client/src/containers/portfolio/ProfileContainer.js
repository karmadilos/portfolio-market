import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Profile from '../../components/network/Profile';
import { useLocation } from 'react-router-dom';
import { readProfile, changeMode, updateProfile } from '../../modules/profile';
// import { getUser } from '../../modules/auth';

// 포트폴리오 페이지에서 프로필 정보를 주고받는 Container 컴포넌트
function ProfileContainer() {
    const uid = useLocation().pathname.split('/').at(-1);
    const { mode, profile } = useSelector(({ profile }) => ({
        mode: profile.mode,
        profile: profile.profile,
        currentPage: profile.currentPage,
    }));

    const dispatch = useDispatch();

    // 업데이트 될 정보를 관리할 지역 컴포넌트
    const [pf, setPf] = useState({
        user_name: profile.user_name,
        comment: profile.comment,
    });

    // 하위 컴포넌트에 전달 될 이벤트 함수
    const onChange = (e) => {
        const { name, value } = e.target;
        setPf({ ...pf, [name]: value });
    };

    const setMode = () => {
        dispatch(changeMode(3));
        setPf({ user_name: profile.user_name, comment: profile.comment });
    };

    // 프로필의 이름/한줄 소개 정보를 업데이트 하는 함수
    const updatePro = (data) => {
        dispatch(updateProfile(data));
        dispatch(changeMode(2));
        setPf({ user_name: profile.user_name, comment: profile.comment });
    };

    // 프로필 이미지를 업데이트 하는 함수
    const updateImg = (e) => {
        if (e.target.files) {
            const req = new FormData();
            req.append('file', e.target.files[0]);
            dispatch(updateProfile({ uid, data: req }));
        }
    };

    useEffect(() => {
        // 현재 접속한 포트폴리오 페이지의 userid가 현재 접속한 사용자와 같으면 1,
        // 다르면 0으로 모드를 전환시킨다.
        if (uid === sessionStorage.getItem('id')) {
            dispatch(changeMode(2));
        } else {
            dispatch(changeMode(1));
        }
        dispatch(readProfile({ uid }));
    }, []); // 컴포넌트가 처음 mount 될때나, 내부 state, props 등이 바뀔 때마다 사용자 정보를 다시 읽어온다.

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
