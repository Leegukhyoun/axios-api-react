import React, { useReducer, useEffect } from 'react';
import axios from 'axios';

//AXIOS 포스트 가져오기(리듀서 사용, 왠지 이게 더 어려운 것 같음)

const PostS = {                 //초기값 설정
    loading:false,
    data:null,
    error:null
}

function reducer(state, action){        //리듀서 함수 설정
    console.log(action);
    switch(action.type){
        case 'LOADING':
            return {
                loading : true,
                data:null,
                error:null
            }
        case 'SUCCESS':
            return {
                loading: false,
                data:action.data,
                error : null
            }
        case 'ERROR':
            return{
                loading : false,
                data:null,
                error : action.error
            }
        default:
            return state;
    }
}


const Post = (props) => {
    const [state, dispatch] = useReducer(reducer, PostS);       //리듀서 선언
    const fetchPost = async () => {
        dispatch({type:'LOADING'});
        try {
            const postList = await axios.get(
                'https://jsonplaceholder.typicode.com/posts'
            );
            dispatch({type:'SUCCESS', data:postList.data})
        }
        catch(e){
            dispatch({type:'ERROR', error:e})
        }
    }
    useEffect(()=>{
        fetchPost();
    },[])           //useEffect에 빈배열을 추가하면 딱 처음 렌더됐을 때만 실행한다
    const {loading, data, error} = state;
    if(loading) return <div>로딩</div>
    if(error) return <div>오류</div>
    if(!data) return null
    return (
        <div>
            {data.map(post=>(
                <tr key={post.id}>
                    <td>제목 : {post.title}</td>
                    <td>내용 : {post.body}</td>
                </tr>
            ))}
        </div>
    );
};

export default Post;