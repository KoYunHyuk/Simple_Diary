import React, {useContext} from 'react'
import { DiaryStateContext } from './App';
import DiaryItem from './DiaryItem';

function DiaryList() {
    const diaryList = useContext(DiaryStateContext);

    return (
        <div className="DiaryList">
            <h2>일기 리스트</h2>
            <h4>{diaryList.length}개의 일기가 있습니다.</h4>
            <div>
                {diaryList.map((it, idx) => (
                    <DiaryItem key={it.id} {...it} />
                ))}
            </div>
        </div>
    )
}

export default DiaryList