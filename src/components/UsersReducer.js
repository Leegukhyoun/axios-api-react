import React,{useReducer, useEffect} from 'react';
import axios from 'axios';
//초기값, reducer 함수생성
//초기값 : loading, data, error

const initialState = {
    loading: false,
    data: null,
    error: null
}
function reducer(state, action){
    switch(action.type){
        case 'LOADING' :
            return {
                loading : true,
                data : null,
                error: null
            }
        case 'SUCCESS' :
            return {
                loading : false,
                data : action.data,
                error : null
            }
        case 'ERROR' :
            return {
                loading : false,
                data : null,
                error : action.error
            }
        default :
        return state;

    }
}
const UsersReducer = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const fetchUsers = async () => {
        dispatch({type:'LOADING'});
        try {
            const response = await axios.get(
                'https://jsonplaceholder.typicode.com/users'
            );
            dispatch({type:'SUCCESS', data:response.data})
        }
        catch(e){
            dispatch({type:'ERROR', error:e})
        }
    }
    useEffect(()=>{
        fetchUsers();
    },[])               //useEffect에 빈배열을 추가하면 딱 처음 렌더됐을 때만 실행한다
    const {loading, data, error} = state;
    if(loading) return <div>로딩중</div>
    if(error) return <div>에러</div>
    if(!data) return null
    return (
        <div>
            <ul>
                {data.map(user=>(
                        <li key={user.id}>
                            {user.username} ({user.name})
                        </li>
                    )    
                )}
            </ul>
            <button onClick={fetchUsers}>다시 불러오기</button>
        </div>
    );
};

export default UsersReducer;