/* Lifecycle - Mount, Unmount */
import React, { useEffect, useState } from 'react'

const UnmountTest = () => {
    useEffect(() => {
        console.log("Mount!");
        
        return () => {
            // Unmount 시점에 실행하게 됨
            console.log("Unmount!")
        };
    }, []);

    return <div>Unmount Testing Component</div>
};

function LifeCycle() {
    const [isVisible, setIsVisible] = useState(false);
    const toggle = () => setIsVisible(!isVisible);

    return (
        <div style={{ padding: 20 }}>
            <button onClick={toggle}>On/Off</button>
            {isVisible && <UnmountTest />}
        </div>
    )
};

export default LifeCycle