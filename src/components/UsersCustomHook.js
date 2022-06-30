import React, {useState} from 'react';
import axios from 'axios';
import useAsync from './useAsync';
import User from './User';

async function getUsers(){
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
}

const UsersCustomHook = () => {
    const [userId, setUserId] = useState(null);
    const [state, refetch] = useAsync(getUsers, [], true);
    const { loading, data, error } = state; 
    if(loading) return <div>로딩중</div>
    if(error) return <div>에러</div>
    if(!data) return <button onClick={refetch}>불러오기</button>
    return (
        <div>
             <ul>
                {data.map(user=>(
                        <li key={user.id} onClick={()=>{setUserId(user.id)}}>
                            {user.username} ({user.name})
                        </li>
                    )    
                )}
            </ul>
            <button onClick={refetch}>다시 불러오기</button>
            {userId && <User id={userId}/>}
        </div>
    );
};

export default UsersCustomHook;