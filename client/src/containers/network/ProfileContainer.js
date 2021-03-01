import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { CardColumns } from 'react-bootstrap';
import { getAllProfile } from '../../lib/apis/profile';
import Profile from '../../components/network/Profile';
import SearchBar from '../../components/network/SearchBar';
import SearchError from '../../components/network/SearchError';

function ProfileContainer({ history }) {
    const [profiles, setProfiles] = useState([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState(null);
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e.target[0].value);
        setSearch(e.target[0].value);
    };

    const onClick = (e) => {
        console.log(e.target.id);
        // history.push(`/portfolio/${e.target.}`)
        history.push(`/portfolio/${e.target.id}`);
    };
    useEffect(() => {
        setError(null);
        if (profiles.length === 0 && !search) {
            getAllProfile()
                .then((res) => {
                    console.log(res.data.data);
                    if (res.data.data.length > 0) {
                        const payload = res.data.data.map((v) => (
                            <Profile
                                key={v.user_id}
                                id={v.user_id}
                                mode={0}
                                imgurl={v.img_url}
                                name={v.user_name}
                                comment={v.comment}
                                onClick={onClick}
                            />
                        ));
                        let tmp = [],
                            data = [];
                        for (let i in payload) {
                            tmp = [...tmp, payload[i]];
                            if ((i + 1) % 3 === 0) {
                                data = [
                                    ...data,
                                    <CardColumns key={i}>{tmp}</CardColumns>,
                                ];
                                tmp = [];
                            }
                        }
                        if (tmp.length !== 0)
                            data = [
                                ...data,
                                <CardColumns key={payload.length}>
                                    {tmp}
                                </CardColumns>,
                            ];
                        console.log(tmp);
                        setProfiles(data);
                    } else {
                        setError(true);
                        setProfiles([]);
                        setSearch('');
                    }
                })
                .catch((err) => {
                    setError(true);
                    console.log(err);
                });
        }
        if (search) {
            getAllProfile(search)
                .then((res) => {
                    console.log(res.data.data);
                    if (res.data.data.length > 0) {
                        const payload = res.data.data.map((v) => (
                            <Profile
                                key={v.user_id}
                                id={v.user_id}
                                mode={0}
                                imgurl={v.img_url}
                                name={v.user_name}
                                comment={v.comment}
                                onClick={onClick}
                            />
                        ));
                        let tmp = [],
                            data = [];
                        for (let i in payload) {
                            tmp = [...tmp, payload[i]];
                            if ((i + 1) % 3 === 0) {
                                data = [
                                    ...data,
                                    <CardColumns key={i}>{tmp}</CardColumns>,
                                ];
                                tmp = [];
                            }
                        }
                        if (tmp.length !== 0)
                            data = [
                                ...data,
                                <CardColumns key={payload.length}>
                                    {tmp}
                                </CardColumns>,
                            ];
                        setProfiles(data);
                    } else {
                        setError(true);
                        setProfiles([]);
                    }
                })
                .catch((err) => {
                    setError(true);
                    console.log(err);
                });
        }
    }, [search]);
    return (
        <>
            <div className="row">
                <SearchBar onSubmit={onSubmit} />
            </div>
            <div>{profiles}</div>
            {error && <SearchError />}
        </>
    );
}

ProfileContainer.propTypes = {
    history: PropTypes.object,
};
export default withRouter(ProfileContainer);
