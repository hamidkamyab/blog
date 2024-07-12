import React from 'react'
import { ad_to_jalali } from '../helper';

function CommentItem({comments}) {
    return (
        <ul className='list-unstyled d-flex flex-column gap-2 m-0 p-0'>
            {comments.map((comment, index) => (
                <li className='border border-1 p-2 bg-white d-flex flex-column' key={index}>
                    <div className="top d-flex align-items-center justify-content-between py-2">
                        <h5 className='comment-name'>{comment.user.name}</h5>
                        <span className='comment-date'>{ad_to_jalali(comment.created_at, true)}</span>
                    </div>
                    <div className="body py-2">
                        <p className='p-0 m-0'>
                            {comment.description}
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default CommentItem
