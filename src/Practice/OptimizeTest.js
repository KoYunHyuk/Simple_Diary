/* React.memo */
import React from 'react'
import { useState, useEffect } from 'react';

// const TextView = React.memo(({ text }) => {
//     useEffect(() => {
//         console.log(`Update :: Text : ${text}`);
//     })

//     return <div>{text}</div>;
// });

// const CountView = React.memo(({ count }) => {
//     useEffect(() => {
//         console.log(`Update :: Count : ${count}`);
//     })

//     return <div>{count}</div>;
// });

const CounterA = React.memo(({ count }) => {
    useEffect(()=>{
        console.log(`CounterA Update - count : ${count}`);
    })

    return <div>{count}</div>;
})

const CounterB = ({ obj }) => {
    useEffect(()=>{
        console.log(`CounterB Update - count : ${obj.count}`);
    })

    return <div>{obj.count}</div>;
}

const areEqual = (prevProps, nextProps) => {
    if(prevProps.obj.count === nextProps.obj.count){
        return true; // 이전 Props = 현재 Props => 리렌더링 X
    }
    return false; //  이전 Props != 현재 Props => 리렌더링 O

    /* 위 코드와 같은 코드 */
    // return prevProps.obj.count === nextProps.obj.count;
}

const MemorizedCounterB = React.memo(CounterB, areEqual);

function Optimizetest() {
    // const [count, setCount] = useState(1);
    // const [text, setText] = useState("");
    const [count, setCount] = useState(1);
    const [obj, setObj] = useState({
        count: 1
    })

    return (
        <div className="Optimizetest" style={{ padding: 50 }}>
            {/* <div>
                <h2>count</h2>
                <CountView count={count} />
                <button onClick={() => setCount(count+1)}>+</button>
            </div>

            <div>
                <h2>text</h2>
                <TextView text={text} />
                <input value={text} onChange={(e) => setText(e.target.value)} />
            </div> */}

            <div>
                <h2>Counter A</h2>
                <CounterA count={count} />
                <button onClick={()=> setCount(count)}>A button</button>
            </div>
            <div>
                <h2>Counter B</h2>
                <MemorizedCounterB obj={obj}/>
                <button 
                    onClick={()=> 
                        setObj({
                            count: obj.count
                        })
                    }
                >
                    B button
                </button>
            </div>
        </div>
    )
}

export default Optimizetest