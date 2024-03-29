import React from 'react'

import { Link, Avatar } from '@nextui-org/react'

const CommentCard = ({commentData}) => {
  return (
    <div className='p-3 rounded-md shadow-md mb-3'>
        <div>
            <p className='flex items-center'>
                <Avatar size='sm' src={`${commentData.commentAuthorImg}.svg`} />
                <Link
                    className='ml-3' 
                    href={`/${commentData.commentAuthor.commentAuthorUsername}`}>
                    @{commentData.commentAuthor.commentAuthorUsername}
                </Link>
                <span className='ml-6'>{commentData.commentCreated.time}</span> 
            </p>
        </div>
        <p className='mt-3'>{commentData.commentText}</p>
    </div>
  )
}

export default CommentCard