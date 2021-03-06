import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CardColumns } from 'react-bootstrap';
import AlertBlock from '../../components/network/AlertBlock';
import Profile from '../../components/network/Profile';
import SearchBar from '../../components/network/SearchBar';
import SearchError from '../../components/network/SearchError';
import { readAllProfiles, searchProfile } from '../../modules/profile';

function ProfileContainer() {
    const { mode, profiles, error } = useSelector(({ profile }) => ({
        mode: profile.mode,
        profiles: profile.profiles,
        error: profile.error,
        status: profile.status,
    }));

    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [errMsg, setErrMsg] = useState(null);

    // 검색창 input change event handler
    const onChange = (e) => {
        console.log(e.target);
        setSearch(e.target.value);
    };
    // 검색창 input submit event handler
    const onSubmit = (e) => {
        e.preventDefault();
        if (search.length < 2)
            setErrMsg('검색어는 최소 2글자 이상으로 입력하세요');
        else dispatch(searchProfile({ search }));
    };

    useEffect(() => {
        dispatch(readAllProfiles());
    }, []);

    const profileOutput = profiles.map((p) => (
        <Profile
            key={p.id}
            uid={p.user_id.toString()}
            mode={mode}
            name={p.user_name}
            imgUrl={p.img_url}
            comment={p.comment}
        />
    ));

    let profileBlock = [];
    for (let i = 0; i < profileOutput.length; i += 3) {
        profileBlock = [
            ...profileBlock,
            <CardColumns key={i}>{profileOutput.slice(i, i + 3)}</CardColumns>,
        ];
    }
    return (
        <>
            <div className="row">
                <SearchBar onSubmit={onSubmit} onChange={onChange} />
            </div>
            {profileBlock}
            <AlertBlock
                message={errMsg}
                setErrMsg={setErrMsg}
                setSearch={setSearch}
            />
            {error && <SearchError />}
        </>
    );
}

export default ProfileContainer;
