/**
 * setState 함수형 업데이트 비교 예제
 * 
 * 설명 : setState를 여러 번 호출할 때 prev 사용 여부에 따른 차이 확인
 * 
 **/ 

import React, { useState } from 'react';

export default function ExPrev() {
    const [count, setCount] = useState(1);
    const [items, setItems] = useState([1,2]); 

    // ===== count =====
    const handleCountGood = ():void => {
    setCount(prev => prev + 1);  
    setCount(prev => prev + 1);  
    setCount(prev => prev + 1);  
    }


    const handleCountBad = ():void => {
    setCount(count + 1);  
    setCount(count + 1);  
    setCount(count + 1);  
    }
    
    // ===== items (배열) =====
    const handleAddGood = ():void => {
    setItems(prev => [...prev, 3]);
    setItems(prev => [...prev, 4]);
    }

    const handleAddBad = ():void => {
        setItems([...items, 3]);
        setItems([...items, 4]);
    }

    return (
        <>
        <h2>set Prev 예제</h2>
            <div>
                count : {count}
            </div>
            <div>
                <button onClick={handleCountGood}>Good</button>
                <button onClick={handleCountBad}>Bad</button>
            </div>
            
            <br/><hr></hr><br/>

            <div>
                <div>items : [{items.join(', ')}]</div>
            </div>
            <div>
                <button onClick={handleAddGood}>Good</button>
                <button onClick={handleAddBad}>Bad</button>
            </div>
        </>
    );
}