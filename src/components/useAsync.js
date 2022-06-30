import { useReducer, useEffect } from 'react';
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
function useAsync(callback, deps = [], skip=false){
    const [state, dispatch] = useReducer(reducer, initialState);
    const fetchDate = async () => {
        dispatch({type : 'LOADING'});
        try {
            const data = await callback();
            dispatch({
                type:"SUCCESS",
                data : data
            })
        }
        catch(e){
            dispatch({
                type:"ERROR",
                error : e
            });
        }
    }
    useEffect(()=>{
        //skip이 true면 fetchDate 실행 안됨
        if(skip) return;
        fetchDate();
        //eslint 설정을 다음 줄에서만 비활성화한다
        //eslint-disable-next-line
    },deps)  // <= eslint 지우면 줄생긴다
    return [state, fetchDate];
}

export default useAsync;