import React, { useEffect, useState } from 'react'

function Loading({w,h}) {
    const [width, setWidth] = useState(24);
    const [height, setHeight] = useState(24);
    console.log(w,h);
    const handleSize = ()=>{
        if(w && h){
            setWidth(w)
            setHeight(h)
        }
    }
    useEffect(() => {
        return () => {
        handleSize()
        };
    }, []);
    return (
        <div className="loading d-flex flex-column w-100 gap-2 align-items-center py-4">
            <div className="spinner-grow text-primary" role="status" style={{width:`${w}px`,height:`${h}px`}}>
            </div>
            <span>در حال دریافت اطلاعات، لطفا منتظر بمانید</span>
        </div>
    )
}

export default Loading
