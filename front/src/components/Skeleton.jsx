import React, { useEffect, useState } from 'react'
import SkeletonElement from './SkeletonElement'
import Shimmer from './Shimmer';

function Skeleton({ h, num = 1, customClass }) {
    const [count, setCount] = useState([]);
    useEffect(() => {
        return () => {
            const newCount = [];
            for (var i = 0; i < num; i++) {
                newCount.push(i)
            }
            setCount(newCount)
        };
    }, [num]);
    return (
        count.map((val, index) => (
            <div className={customClass} key={index}>
                <div className='skeleton-wrapper position-relative p-1' style={{ height: `${h}px` }} key={index}>
                    <div className="skeleton-box h-100 d-flex flex-column justify-content-between gap-2">
                        <SkeletonElement type={'image'} />
                        <SkeletonElement type={'title'} />
                        <SkeletonElement type={'description'} />
                        <SkeletonElement type={'details'} />
                    </div>
                    <Shimmer />
                </div>
            </div>
        ))

    )
}

export default Skeleton
