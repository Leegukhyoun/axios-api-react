import React from 'react';
import axios from 'axios';
import useAsync from './useAsync';

async function getUser(id) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    return response.data;
}

const User = ({id}) => {
    const [state] = useAsync(()=>getUser(id), [id]);
    const { loading, data, error } = state; 
    if(loading) return <div>로딩중</div>
    if(error) return <div>에러</div>
    if(!data) return null;
    return (
        <div>
            <h2>{data.username}</h2>
            <p>
                Email : {data.email}
            </p>
        </div>
    );
};

export default User;