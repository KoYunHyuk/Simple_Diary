import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState, useRef } from 'react'
import { DiaryDispatchContext } from './App';

function DiaryEditor() {
    const {onCreate} = useContext(DiaryDispatchContext);

    const authorInput = useRef();
    const contentInput = useRef();
    const selectInput = useRef();
    
    const [state, setState] = useState({
        author: "",
        content: "",
        emotion: 1,
    })


    function handleChangeState(e){
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }

    function handleSubmit(){
        if(state.author.length < 1) {
            authorInput.current.focus();
            return;
        } 

        if(state.content.length < 5) {
            contentInput.current.focus();
            return;
        }

        onCreate(state.author, state.content, state.emotion);
        alert("저장 성공");
        setState({ // 입력했던 데이터를 초기화
            author: "",
            content: "",
            emotion: 1,
        })
    }

    useEffect(()=> {
        console.log("DiaryEditor Render!!");
    }, [])

    return (
        <div className="DiaryEditor">
            <h2>오늘의 일기</h2>
            <div>
                <input 
                    ref={authorInput}
                    name="author"
                    type="text"
                    value={state.author} 
                    onChange={handleChangeState}
                />
            </div>
            <div>
                <textarea
                    ref={contentInput}
                    name="content"
                    value={state.content} 
                    onChange={handleChangeState}
                />
            </div>
            <div>
                <select
                    ref={selectInput}
                    name="emotion"
                    value={state.emotion}
                    onChange={handleChangeState}
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>
            <div>
                <button onClick={handleSubmit}>일기 저장하기</button>
            </div>
        </div>
    )
}

export default React.memo(DiaryEditor)