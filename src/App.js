// 라이브러리 & CSS
import React, { useState, useReducer, useEffect, useRef, useMemo, useCallback } from 'react';
import './App.css';

// Component
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';


const reducer = (state, action) => {
    switch (action.type) {
        case "INIT": {
            return action.data;
        }
        case "CREATE": {
            const created_date = new Date().getTime();
            const newItem = {
                ...action.data,
                created_date
            }
            return [newItem, ...state];
        }
        case "REMOVE": {
            return state.filter((it)=>it.id !== action.targetId);
        }
        case "EDIT": {
            return state.map((it)=>
                it.id === action.targetId ? 
                {...it, content: action.newContent} : it
            );
        }
        default:
            return state;
    }
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
    // const [data, setData] = useState([]);
    const [data, dispatch] = useReducer(reducer, []);


    const dataId = useRef(0);

    const getData = async() => {
        const res = await fetch('https://jsonplaceholder.typicode.com/comments')
            .then((res) => res.json());

        // console.log(res);
        const initData = res.slice(0, 20).map((it) => {
            return {
                author: it.email,
                content: it.body,
                emotion: Math.floor(Math.random() * 5) + 1, // 1 ~ 5 사이의 난수 생성
                created_date: new Date().getTime(),
                id: dataId.current++
            }
        })

        dispatch({type: "INIT", data:initData});
        // setData(initData); 
    }

    useEffect(() => {
        getData();
    }, [])

    const onCreate = useCallback((author, content, emotion) => {
        dispatch({type: "CREATE", data: {author, content, emotion, id : dataId.current}})       

        dataId.current += 1;
    }, [data]);

    const onRemove = useCallback((targetId) => {
        dispatch({type: "REMOVE", targetId});
        // setData(data => data.filter((it) => it.id !== targetId));
    }, []);

    const onEdit = useCallback((targetId, newContent) => {
        dispatch({type: "EDIT", targetId, newContent});
        // setData(
        //     (data) => data.map((it)=>it.id === targetId ? {...it, content: newContent} : it)
        // );
    }, [])

    const memorizedDispatchers = useMemo(() => {
        return {onCreate, onEdit, onRemove}
    }, []);

    const getDinaryAnalysis = useMemo(
        () => {
            const goodCount = data.filter((it) => it.emotion >= 3).length;
            const bacCount = data.length - goodCount;
            const goodRatio = (goodCount / data.length) * 100;

            return {goodCount, bacCount, goodRatio};
        }, [data.length]
    );
    
    const {goodCount, bacCount, goodRatio} = getDinaryAnalysis;

    return (
        <DiaryStateContext.Provider value={data} >
            <DiaryDispatchContext.Provider value={memorizedDispatchers}>
                <div className="App">
                    {/* <LifeCycle /> */}
                    {/* <OptimizeTest /> */}
                    <DiaryEditor />
                    <div>전체 일기 : {data.length}</div>
                    <div>기분 좋은 일기 개수 : {goodCount}</div>
                    <div>기분 나쁜 일기 개수 : {bacCount}</div>
                    <div>기분 좋은 일기 비율 : {goodRatio}</div>
                    <DiaryList />
                </div>
            </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
    );
}

export default App;
