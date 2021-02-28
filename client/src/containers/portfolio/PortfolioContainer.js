import React, { useEffect, useState } from 'react';
import Profile from '../../components/network/Profile';
import { useLocation } from 'react-router-dom'
import { getProfile } from '../../lib/apis/profile';

function PortfolioContainer() {
    // 프로필, 학력, 수상내역, 프로젝트, 자격증 정보 가져오기
    const location = useLocation().pathname.split('/');
    const [profile, setProfile] = useState(null);
    //   const [educations, setEducations] = useState([]);
    //   const [awards, setAwards] = useState([]);
    //   const [projects, setProjects] = useState([]);
    //   const [certificates, setCerticicates] = useState([]);
    const onClick = (e) => {
        console.log(e.target.id);
        // 수정 버튼 누르면, cache에 저장해놓은 수정 Form에 현재 내용 전달해 렌더링하기
    }
    useEffect(() => {
        console.log(location[location.length - 1]);
        if (!profile) {
            getProfile(location[location.length - 1])
                .then(res => {
                    // mode, imgurl, name, comment
                    const payload = res.data.data.map(v => (
                        <Profile
                            key={v.user_id}
                            id={v.user_id}
                            mode={1}
                            imgurl={v.img_url}
                            name={v.user_name}
                            comment={v.comment}
                            onClick={onClick} />));
                    setProfile(payload);
                    console.log(payload);
                })
        }
    }, [profile])
    return (
        <div>
            {profile}
        </div>
    );
}

export default PortfolioContainer;
