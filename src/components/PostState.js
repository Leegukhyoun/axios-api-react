import React,{useEffect, useState} from 'react';
import axios from 'axios';

const PostState = (props) => {

    //현재 상태 정리
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    //상태 업데이트
    const fetchPost = async () => {
        try{
            setError(null);
            setPost(null);
            setLoading(true);
            const postList = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setPost(postList.data);
        }
        catch(e){
            setError(e);
        }
        setLoading(false);
    }
    useEffect(()=>{
        fetchPost();
    },[]);                         //useEffect에 빈배열을 추가하면 딱 처음 렌더됐을 때만 실행한다
    if(loading) return <div>성수야..</div>
    if(error) return <div>에러나는중</div>
    if(!post) return null;


    return (
        <div>
            {post.map(post=>(
                <tr key={post.id}>
                    <td>제목 : {post.title}</td>
                    <td>내용 : {post.body}</td>
                </tr>
            ))}
        </div>
    );
};

export default PostState;